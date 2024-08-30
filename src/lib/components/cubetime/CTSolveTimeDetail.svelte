<script lang="ts">
    import {Penalty, type Solve} from "$lib/types/solve.type";
    import {createEventDispatcher} from "svelte";
    import {fade, scale} from "svelte/transition";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import {addNote, editPenalty} from "$lib/database";

    export let solveData: Solve;

    const dispatch = createEventDispatcher()

    $: ({date, time, scramble, puzzleType, penalty, note} = solveData)
    $: commentInput = note

    function closeDetail() {
        addNote(solveData, commentInput ?? "")

        dispatch('hide')
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions-->
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-aria-attributes -->
<!-- svelte-ignore a11y-aria-activedescendant-has-tabindex -->
<!-- svelte-ignore a11y-incorrect-aria-attribute-type -->
<!-- svelte-ignore a11y-misplaced-role -->
<!-- svelte-ignore a11y-no-redundant-roles -->
<!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-role-supports-aria-props -->
<!-- svelte-ignore a11y-unknown-role -->
<!-- svelte-ignore a11y-role-has-required-aria-props -->
<div transition:fade={{duration: 150}} on:click={closeDetail} class="w-screen h-screen bg-gray-100/10 backdrop-blur-md z-50 fixed top-0 left-0" />
<div in:scale={{delay: 150}} out:scale class="flex flex-col bg-white rounded-md border-1 border-gray-200 absolute
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] z-50 px-4 pt-2 pb-4">
    <div class="flex items-center justify-between border-b-1 border-gray-200">
            <span class="font-semibold text-2xl">
                {penalty === Penalty.None ? time.toFixed(3) : penalty === Penalty.PlusTwo ? `${time.toFixed(3)}+` : 'DNF'}
            </span>
        <span class="font-medium">
                {puzzleType}
            </span>
    </div>
    <div class="flex">
        <p class="text-gray-500 text-sm">
            {new Date(date).toLocaleDateString('en-US')}
        </p>
    </div>
    <div class="flex flex-col justify-center items-center gap-8 pt-8">
        <p class="text-center font-medium">
            {scramble}
        </p>
        <div class="flex justify-end items-center w-full gap-2">
            <CTButton on:click={() => editPenalty(solveData, Penalty.None)} size="small" color="white" icon="i-[fluent--checkmark-circle-12-regular]" disabled={penalty === Penalty.None}>
                OK
            </CTButton>
            <CTButton on:click={() => editPenalty(solveData, Penalty.PlusTwo)} size="small" color="white" icon="i-[mynaui--two-circle]" disabled={penalty === Penalty.PlusTwo}>
                +2
            </CTButton>
            <CTButton on:click={() => editPenalty(solveData, Penalty.DNF)} size="small" color="white" icon="i-[jam--close-circle]" disabled={penalty === Penalty.DNF}>
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
</div>

<style lang="postcss">
    textarea {
        @apply w-full outline-none bg-gray-100 rounded-md h-24 px-2 py-1 text-sm resize-none;
    }
</style>
