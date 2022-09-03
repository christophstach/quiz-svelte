<script lang="ts">
    import type { Answer, Question } from '../types';
    import { findAnswer } from '../utils';

    export let question: Question;
    export let selectedAnswerIds: string[] = [];

    let answers: Answer[];

    $: answers = question.answerIds.map((answerId) => findAnswer(answerId));
</script>

<div>
    <div class="flex items-center mb-10">
        {#if question.icon}
            <div class="pr-5">
                <img class="w-8 h-8" src={question.icon} alt="Question Icon" />
            </div>            
        {/if}

        <h1 class="flex-1 text-jansen-purple font-bold text-lg text-center">{question.text}</h1>
    </div>

    {#each answers as answer}
        <label for={`multiple-choice-answer-${answer.id}`} class="cursor-pointer border-jansen-purple border my-5 p-5 text-jansen-purple flex gap-3 items-center">
            <div class="flex items-center">
                <input 
                    name="multiple-choice-answer"
                    type="checkbox"
                    id={`multiple-choice-answer-${answer.id}`}
                    value={answer.id}
                    bind:group={selectedAnswerIds}    
                /> 
            </div>

            <div>
                {answer.text} (Id: {answer.id})
            </div>
        </label>    
    {/each}
</div>