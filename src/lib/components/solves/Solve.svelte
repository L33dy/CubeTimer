<script lang="ts">
    import type {Solve} from "$lib/types/solve.type";

    export let solveData: Solve;

    let isSelected = false;
    let solve: HTMLElement | null;

    function selectSolve() {
        isSelected = !isSelected;
    }

    $: if (solve) {
        if (isSelected) {
            solve.setAttribute('data-selected', '')
        }
        else {
            solve.removeAttribute('data-selected')
        }
    }
</script>

<button bind:this={solve} on:click={selectSolve} class="h-[60px] max-h-[60px] bg-white px-8 rounded-md shadow-md transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
    <span class="text-lg font-medium">{solveData.time}</span>
    <span id="checkmark" class="bg-white rounded-full w-4 h-4 hidden justify-center items-center">
        <span class="i-[bi--check] text-violet-500" />
    </span>
</button>

<style lang="postcss">
    :global([data-selected]) {
        @apply bg-gray-200;
    }

    :global([data-selected] > #checkmark) {
        @apply flex;
    }
</style>
