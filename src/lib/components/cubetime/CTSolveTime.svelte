<script lang="ts">
    import {Penalty, type Solve} from "$lib/types/solve.type";
    import {createEventDispatcher} from "svelte";

    export let onClick: (() => void) | undefined = undefined

    export let solveData: Solve
    export let selectMode: boolean = false

    let solve: HTMLElement;

    const dispatch = createEventDispatcher()

    $: ({time, penalty} = solveData)

    function selectSolve() {
        let isSelected = solve.getAttribute('data-selected');

        isSelected === '' ? solve.removeAttribute('data-selected') : solve.setAttribute('data-selected', '')

        dispatch('select', {
            data: solveData,
        })
    }
</script>

<button bind:this={solve}
        class="transition-all duration-300 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm border-1 border-transparent disabled:hover:border-transparent flex flex-col justify-center items-center h-[54px] outline-none"
        class:hover:border-primary-200={!selectMode}
        disabled={onClick === undefined}
        on:click={() => selectMode ? selectSolve() : onClick?.()}>
    <span class="font-semibold text-lg">
        { penalty === Penalty.NONE ? time.toFixed(3) : penalty === Penalty.PLUSTWO ? `${time.toFixed(3)}+` : 'DNF' }
    </span>
    <span id="checkmark">
        <span class="i-[bi--check] text-violet-500"/>
    </span>
</button>

<style>
    :global([data-selected]) {
        @apply bg-gray-200;
    }

    #checkmark {
        @apply h-0 w-0 opacity-0 transition-all duration-150 bg-white shadow-md rounded-full flex justify-center items-center;
    }

    :global([data-selected]) > #checkmark {
        @apply h-4 w-4 opacity-100;
    }
</style>
