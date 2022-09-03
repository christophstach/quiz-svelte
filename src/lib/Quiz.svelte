
<script lang="ts">
    import MultipleChoiceQuestion from './MultipleChoiceQuestion.svelte';
    import SimpleQuestion from './SimpleQuestion.svelte';
    import { questionsStore, currentQuizDepthStore } from '../stores';
    import { QuestionType, type Question, type ReportQuestion } from '../types';
    import { findAnswer, findQuestion } from '../utils';
    import { tick } from 'svelte';
    import Rootline from './Rootline.svelte';
import { answers } from '../data/answers';
  
    function getQuestion(question: Question, depth: number): Question | null {
        if(depth > 0 && isQuestionAnswered(question)) {
            let followUpQuestion: Question;
            
            if(question.type === QuestionType.MultipleChoice) {
                followUpQuestion = findQuestion(question.followUpQuestionId);
            } else {
                const selectedAnswer = findAnswer(question.selectedAnswerId);
                followUpQuestion = findQuestion(selectedAnswer.followUpQuestionId);
            }

            if(followUpQuestion) {
                return getQuestion(followUpQuestion, depth - 1);
            } else {
                return null;
            }
        } else if(depth === 0) {
            return question;
        } else {
            return null;
        }
    }

    function getReportQuestions(): ReportQuestion[] {
        let reportQuestions: Question[] = [];
        let nextQuestion: Question | null = $questionsStore[0];

        while(nextQuestion !== null && isQuestionAnswered(nextQuestion)) {
            reportQuestions = [...reportQuestions, nextQuestion];

            if(nextQuestion.type === QuestionType.MultipleChoice) {
                if(nextQuestion.followUpQuestionId) {
                    nextQuestion = findQuestion(nextQuestion.followUpQuestionId);
                } else { 
                    nextQuestion = null;
                }
            } else {
                const selectedAnswer = findAnswer(nextQuestion.selectedAnswerId);

                if(selectedAnswer.followUpQuestionId) {
                    nextQuestion = findQuestion(selectedAnswer.followUpQuestionId);
                } else {
                    nextQuestion = null;
                }
            }
        }

        
        
        return reportQuestions.map((reportQuestion) => {
            return {
                ...reportQuestion,
                answers: reportQuestion.answerIds.map((answerId) => {
                    const selected = reportQuestion.type === QuestionType.MultipleChoice ? reportQuestion.selectedAnswerIds.includes(answerId) : reportQuestion.selectedAnswerId === answerId

                    return {
                        ...findAnswer(answerId),
                        selected
                    };
                })
            }
        });
    }

    function isQuestionAnswered(question: Question): boolean {
        if(question.type === QuestionType.MultipleChoice) {
            if(question.minAnswers !== null && question.maxAnswers !== null) {
                return question.selectedAnswerIds !== null && 
                    question.selectedAnswerIds.length >= question.minAnswers &&
                    question.selectedAnswerIds.length <= question.maxAnswers;
            } else if(question.minAnswers !== null && question.maxAnswers === null) {
                return question.selectedAnswerIds !== null && 
                    question.selectedAnswerIds.length >= question.minAnswers;
            } else if(question.minAnswers === null && question.maxAnswers !== null) {
                return question.selectedAnswerIds !== null && 
                    question.selectedAnswerIds.length <= question.maxAnswers;
            } else {
                return question.selectedAnswerIds !== null;
            }
        } else {
            return question.selectedAnswerId !== null;
        }
    }
    

    let question: Question;
    let answeredQuestions: Question[];
    let base64: string;
    let selectedAnswerId: string | null = null;
    let selectedAnswerIds: string[] = [];
    let reportQuestions: ReportQuestion[] = [];
    let isNextDisabled: () => boolean;
    let isPrevDisabled: () => boolean;
    
  
    $: {
        question = getQuestion($questionsStore[0], $currentQuizDepthStore);
        answeredQuestions = $questionsStore.filter(isQuestionAnswered);
        reportQuestions = getReportQuestions();

        // selectedAnswerId = question.selectedAnswerId;
    
        //const buffer = Buffer.from(JSON.stringify(answeredQuestions));
    
        //base64 = buffer.toString('base64url');
        if(window) {
            base64 = window.btoa(JSON.stringify(reportQuestions));
        }

        isPrevDisabled = () => {
            return $currentQuizDepthStore <= 0;
        }

        isNextDisabled = () => {
            if(question.type === QuestionType.MultipleChoice) {
                if(question.minAnswers !== null && question.maxAnswers !== null) {
                    return selectedAnswerIds.length < question.minAnswers || selectedAnswerIds.length > question.maxAnswers;
                } else if(question.minAnswers !== null && question.maxAnswers === null) {
                    return selectedAnswerIds.length < question.minAnswers;
                } else if(question.minAnswers === null && question.maxAnswers !== null) {
                    return selectedAnswerIds.length > question.maxAnswers;
                } else {
                    return false;
                }
            } else {
                return selectedAnswerId === null;        
            }
        }
    }


    function handlePrev() {
        currentQuizDepthStore.update((current) => {
            return current - 1;
        });

        tick().then(() => {
            if(question) {
                if(question.type === QuestionType.MultipleChoice) {
                    selectedAnswerIds = question.selectedAnswerIds;
                } else {
                    selectedAnswerId = question.selectedAnswerId;
                }
            } else {
                selectedAnswerId = null;
                selectedAnswerIds = [];
            }
        });
    }

    function handleNext() {
        questionsStore.update((current) => {
            const next = current;
            const questionIdx = current.findIndex((q) => q.id === question.id);

            if(next[questionIdx].type === QuestionType.MultipleChoice) {
                next[questionIdx].selectedAnswerIds = selectedAnswerIds;
            } else {
                next[questionIdx].selectedAnswerId = selectedAnswerId;
            }
            
            return next;
        });

        currentQuizDepthStore.update((current) => {
            return current + 1
        });
        
        tick().then(() => {
            if(question) {
                if(question.type === QuestionType.MultipleChoice) {
                    selectedAnswerIds = question.selectedAnswerIds;
                } else {
                    selectedAnswerId = question.selectedAnswerId;
                }
            } else {
                selectedAnswerId = null;
                selectedAnswerIds = [];
            }
        });
    }
</script>

<div class="p-10 min-h-full">
    <div class="shadow-quiz flex flex-col max-w-[960px] mx-auto">
        <div  class="flex justify-between pt-3">
            <div class="bg-jansen-purple text-white p-3">
                Seite {$currentQuizDepthStore + 1}
            </div>

            <div class="bg-jansen-yellow text-white p-3 -mr-3">
                Zu 100% für 0 Euro
            </div>
        </div>

        <div class="p-10">
            <Rootline />
        </div>

    
        {#if question}
            <div class="pb-10 px-10">
                {#if question.type === QuestionType.Simple}
                    <SimpleQuestion 
                        {question}
                        on:questionAnswered={handleNext}
                        bind:selectedAnswerId
                    />
                {:else}
                    <MultipleChoiceQuestion 
                        {question}
                        bind:selectedAnswerIds
                    />
                {/if}
            </div>
    
            <div class="border-t border-jansen-purple px-10 py-5 flex justify-between">
                <button 
                    class="text-white bg-jansen-yellow p-2 disabled:bg-gray-500"
                    on:click={handlePrev}
                    disabled={isPrevDisabled()}>Zurück</button>
    
                <button 
                    class="text-white bg-jansen-yellow p-2 disabled:bg-gray-500"
                    on:click={handleNext} 
                    disabled={isNextDisabled()}>Weiter</button>
            </div>
        {:else}
            <div class="p-10">
                <h1 class="text-jansen-purple font-bold text-2xl text-center">Vielen Danke die Teilnahme am Quiz!</h1>
            </div>
            
            <div class="p-10">
                {#each reportQuestions as reportQuestion, i}
                    <div class="flex items-center py-5">
                        {#if reportQuestion.icon}
                            <div class="pr-5">
                                <img class="w-8 h-8" src={reportQuestion.icon} alt="Question Icon" />
                            </div>            
                        {/if}
                
                        <h1 class="flex-1 text-jansen-purple font-bold text-lg">{reportQuestion.text}</h1>
                    </div>
                
                    {#each reportQuestion.answers as reportAnswer}
                        <div class="py-1">
                            {#if reportAnswer.selected}
                                <strong>{reportAnswer.text}</strong>
                            {:else}
                                {reportAnswer.text}
                            {/if}
                        </div>
                    {/each}
                {/each}
            </div>

            <pre>{JSON.stringify(reportQuestions, null, 2)}</pre>

            <div class="border-t border-jansen-purple px-10 py-5 flex justify-between">
                <button 
                    class="text-white bg-jansen-yellow p-2 disabled:bg-gray-500"
                    on:click={handlePrev}
                    disabled={isPrevDisabled()}>Zurück</button>
            </div>
        {/if}
    </div>    
</div>
