<script>
    import { fade } from "svelte/transition"

    export let time;

    let timeObject;
    let selected = false;

    function toggleSelect() {
        selected = !selected;

        if (selected) {
            timeObject.setAttribute('data-selected', '')
        }
        else {
            timeObject.removeAttribute('data-selected')
        }
    }
</script>

<button bind:this={timeObject} on:click={toggleSelect} class="transition-colors duration-500 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm flex flex-col justify-center items-center h-[52px] outline-none">
    <span class="font-semibold text-lg">{time}</span>
    {#if selected}
        <img transition:fade={{duration: 200}} src="../../../icons/check.svg" alt="check" class="w-4 p-0.5 bg-white rounded-[50%]">
    {/if}
</button>

<style lang="postcss">
    :global([data-selected]) {
        @apply bg-gray-200;
    }
</style>