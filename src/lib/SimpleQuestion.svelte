<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Answer, Question } from '../types';
    import { findAnswer } from '../utils';

    export let question: Question;
    export let selectedAnswerId: string | null = null;


    const dispatch = createEventDispatcher<{
        questionAnswered: Question
    }>();

    let answers: Answer[];

    $: answers = question.answerIds.map((answerId) => findAnswer(answerId));

    function handleRadioChange() {
        dispatch('questionAnswered');
    }
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
        <label for={`simple-answer-${answer.id}`} class="cursor-pointer border-jansen-purple border my-5 p-5 text-jansen-purple flex gap-3 items-center">
            <div class="flex items-center">
                <input 
                    name="simple-answer"
                    type="radio" 
                    id={`simple-answer-${answer.id}`} 
                    value={answer.id}
                    bind:group={selectedAnswerId}
                    on:change={handleRadioChange}
                 /> 
            </div>

            <div>
                {answer.text} (Id: {answer.id})
            </div>
        </label>
    {/each}
</div>