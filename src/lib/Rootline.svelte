<script lang="ts">
    import { currentQuizDepthStore } from '../stores';
    import { } from 'svelte/animate';
    import { elasticInOut, sineIn, expoIn, linear } from 'svelte/easing';

    let pages: number[];

    $: {
        pages = [];
        for (let i = 0; i <= $currentQuizDepthStore; i++) {
            pages = [...pages, i];
        }   
    }

    function handlePageClick(page: number) {
        currentQuizDepthStore.set(page);
    }

    function grow(node, {
	    delay = 0,
	    duration = 400
    }) {


        return {
            css: (t) => {
                const eased = linear(t);

                return `width: ${eased * 2.5}rem`
            },
            delay,
            duration
        }
    }

    function fade(node, {
        delay = 400,
        duration = 0
    }) {
        const o = +getComputedStyle(node).opacity;

        return {
            delay,
            duration,
            css: (t) => `opacity: ${t * o}`
        };
    }
</script>

<ul class="relative">
    <div class="h-2 w-full absolute bg-gray-300 mt-[12px] -z-2"></div>
    <div class="absolute h-8 w-8 rounded-full bg-green-600 right-0 text-white text-5xl flex items-center justify-center">
        &bullet;
    </div>

    <div class="absolute flex ">
        {#each pages as page, i}
        <li class="flex items-center">
            {#if i < pages.length - 1}
                <button
                    class="h-8 w-8 rounded-full bg-jansen-yellow text-white flex items-center justify-center" 
                    on:click={() => handlePageClick(page)}>{page + 1}</button>    
                
                
                    <div 
                        in:grow
                        class="bg-jansen-yellow h-2 w-10 -m-1"></div>        
            {:else}
                <button
                    class="h-8 w-8 rounded-full bg-gray-500 text-white flex items-center justify-center" 
                    on:click={() => handlePageClick(page)}>{page + 1}</button>       
            {/if}

        </li>    
    {/each}
    </div>


</ul>