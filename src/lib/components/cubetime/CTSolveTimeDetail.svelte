<script lang="ts">
    import {Penalty, type Solve} from "$lib/types/solve.type";
    import {createEventDispatcher} from "svelte";
    import {fade, scale} from "svelte/transition";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import {addNote, editPenalty} from "$lib/database";
    import ScrambleDisplay from "$lib/components/solves/ScrambleDisplay.svelte";
    import {deleteSolve} from "$lib/database.js";

    export let solveData: Solve;

    const dispatch = createEventDispatcher()

    $: ({date, time, scramble, puzzleType, penalty, note} = solveData)
    $: commentInput = note

    function closeDetail() {
        addNote(solveData, commentInput)

        dispatch('hide')
    }
</script>

<div class="w-screen h-screen bg-gray-100/10 backdrop-blur-md z-50 fixed top-0 left-0" on:click={closeDetail}
     transition:fade={{duration: 150}}/>

<div class="flex flex-col bg-white rounded-md border-1 border-gray-200 absolute
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 px-4 pt-2 pb-4" in:scale={{delay: 150}} out:scale>
    <div class="flex items-center justify-between border-b-1 border-gray-200">
        {#if penalty === Penalty.None}
            <span class="font-semibold text-2xl">
                {time.toFixed(3)}
            </span>
            {:else if penalty === Penalty.PlusTwo}
            <div class="flex items-center gap-2">
                <span class="font-semibold text-2xl">
                    {(time+2).toFixed(3)}
                </span>
                <span class="text-gray-600 text-sm">
                    ({time.toFixed(3)}+)
                </span>
            </div>
            {:else if penalty === Penalty.DNF}
            <span class="font-semibold text-2xl">
                DNF
            </span>
        {/if}
        <span class="font-medium capitalize">
            {puzzleType}
        </span>
    </div>
    <div class="flex">
        <p class="text-gray-500 text-sm">
            {new Date(date).toLocaleDateString('en-US')} {new Date(date).toLocaleTimeString('en-US')}
        </p>
    </div>
    <div class="flex flex-col justify-center items-center gap-8 pt-8">
        <p class="text-center font-medium text-lg">
            {scramble}
        </p>
        <ScrambleDisplay {scramble} {puzzleType} />
        <div class="flex justify-end items-center w-full gap-2">
            <CTButton color="white" disabled={penalty === Penalty.None} icon="i-[fluent--checkmark-circle-12-regular]"
                      on:click={() => editPenalty(solveData, Penalty.None)} size="small">
                OK
            </CTButton>
            <CTButton color="white" disabled={penalty === Penalty.PlusTwo} icon="i-[mynaui--two-circle]"
                      on:click={() => editPenalty(solveData, Penalty.PlusTwo)} size="small">
                +2
            </CTButton>
            <CTButton color="white" disabled={penalty === Penalty.DNF} icon="i-[jam--close-circle]"
                      on:click={() => editPenalty(solveData, Penalty.DNF)} size="small">
                DNF
            </CTButton>
        </div>
    </div>
    <div class="flex flex-col gap-2 mt-auto w-full">
        <p class="font-medium uppercase border-b-1 border-gray-200">
            Note
        </p>
        <textarea bind:value={commentInput} placeholder="Add a note..."></textarea>
    </div>
    <div class="flex justify-end items-center pt-4">
        <CTButton on:click={() => deleteSolve(solveData)} color="red" icon="i-[solar--trash-bin-trash-linear]">
            Delete
        </CTButton>
    </div>
</div>

<style lang="postcss">
    textarea {
        @apply w-full outline-none bg-gray-100 rounded-md h-24 px-2 py-1 text-sm resize-none;
    }
</style>
