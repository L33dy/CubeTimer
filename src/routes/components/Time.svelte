<script>
    export let time;
    export let penalty;

    let timeObject;

    function toggleSelect() {
        let isSelected = timeObject.hasAttribute('data-selected')

        if (!isSelected) {
            timeObject.setAttribute('data-selected', '')
        } else {
            timeObject.removeAttribute('data-selected')
        }
    }

    let timeText;

    $: {
        timeText = penalty === 0 ? time : penalty === 1 ? `${time}+` : 'DNF';
    }
</script>

<button data-time={time} bind:this={timeObject} class="transition-colors duration-500 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm flex flex-col justify-center items-center h-[58px] outline-none"
        on:click={toggleSelect}>
    <span class="font-semibold text-lg">{timeText}</span>
    <img alt="check" class="checkmark w-4 p-0.5 bg-white rounded-[50%]" src="../../../icons/check.svg">
</button>

<style lang="postcss">
    :global([data-selected]) {
        @apply bg-gray-200;
    }

    :global([data-selected] > .checkmark) {
        @apply block;
    }

    :global(:not([data-selected]) > .checkmark) {
        @apply hidden;
    }
</style>