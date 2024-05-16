<script>
    import {slide} from "svelte/transition";

    export let time;

    let edit = false;
</script>

<button on:click={() => edit = !edit} class="rounded-md px-5 py-1.5 bg-white shadow-sm hover:scale-105 cursor-default transition-all duration-300 ease-in-out flex flex-col justify-center items-center h-fit">
    <span class="font-semibold text-lg">{time}</span>
    {#if edit}
        <div transition:slide={{duration: 300}} class="flex justify-center items-center gap-1.5 child-hover:underline">
            <button>+2</button>
            <button>DNF</button>
        </div>
    {/if}
</button>