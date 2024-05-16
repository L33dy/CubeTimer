<script>
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

<button bind:this={timeObject} on:click={toggleSelect} class="transition-colors duration-500 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm flex flex-col justify-center items-center h-fit">
    <span class="font-semibold text-lg">{time}</span>
</button>

<style lang="postcss">
    :global([data-selected]) {
        @apply bg-gray-200;
    }
</style>