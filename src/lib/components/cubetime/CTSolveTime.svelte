<script lang="ts">
    import {Penalty, type Solve} from "$lib/types/solve.type";

    export let onClick: () => void

    export let solveData: Solve
    export let selectable: boolean = false
    export let selectMode: boolean = false

    let isSelected: boolean

    $: ({time, penalty} = solveData)
    $: if (selectMode) isSelected = false

    function selectSolve() {
        isSelected = !isSelected;
    }
</script>

<button on:click={() => selectMode ? selectSolve() : onClick()}
        disabled={!selectable}
        class:!bg-gray-200={selectMode && isSelected}
        class:hover:border-primary-200={!selectMode}
        class="transition-all duration-300 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm border-1 border-transparent disabled:hover:border-transparent flex flex-col justify-center items-center h-[54px] outline-none">
    <span class="font-semibold text-lg">
        { penalty === Penalty.NONE ? time.toFixed(3) : penalty === Penalty.PLUSTWO ? `${time.toFixed(3)}+` : 'DNF' }
    </span>
    {#if selectMode}
        <span class:hidden={!isSelected} class:flex={isSelected} class="bg-white rounded-full w-4 h-4 justify-center items-center">
            <span class="i-[bi--check] text-violet-500" />
        </span>
    {/if}
</button>
