<script lang="ts">
    import {scrambleData} from "$lib/store";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import CTPopper from "$lib/components/cubetime/CTPopper.svelte";
    import {clearData, editPenalty} from "$lib/database";
    import {Penalty, type Solve} from "$lib/types/solve.type";
    import {writable} from "svelte/store";
    import CTPopperButton from "$lib/components/cubetime/CTPopperButton.svelte";
    import type {PopperOption} from "$lib/types/popper.type";
    import {deleteSolves} from "$lib/database.js";
    import CTSolveTime from "$lib/components/cubetime/CTSolveTime.svelte";
    import {showDetail} from "$lib/solveDetail";
    import CTPopperSpace from "$lib/components/cubetime/CTPopperSpace.svelte";
    import {createModal} from "$lib/modal";

    let solves = writable(new Set<Solve>())
    let solveContainer: HTMLElement

    let selectMode = false;
    let showOptions: boolean;

    const penaltyOptions: PopperOption[] = [
        {
            name: "No Penalty",
            icon: "i-[fluent--checkmark-circle-12-regular]",
            onClick: () => editPenalty(Array.from($solves), Penalty.NONE)
        },
        {
            name: "+2",
            icon: "i-[mynaui--two-circle]",
            onClick: () => editPenalty(Array.from($solves), Penalty.PLUSTWO)
        },
        {
            name: "DNF",
            icon: "i-[jam--close-circle]",
            onClick: () => editPenalty(Array.from($solves), Penalty.DNF)
        }
    ]

    function select(event: CustomEvent) {
        const data: Solve = event.detail.data

        solves.update(set => {
            set.has(data) ? set.delete(data) : set.add(data)

            return new Set(set)
        })
    }

    function selectAll() {
        const solves = solveContainer.children

        for (const solve of solves) {
            solve.setAttribute('data-selected', '')
        }

        $solves = new Set($scrambleData)
    }

    function cancel() {
        selectMode = false
        showOptions = false

        const solves = solveContainer.children

        for (const solve of solves) {
            solve.removeAttribute('data-selected')
        }

        $solves = new Set()
    }

    function clearSession(): void {
        clearData()
    }

    function toggleOptions(): void {
        showOptions = !showOptions;
    }
</script>

<div class="flex flex-col justify-center items-center gap-10 w-[400px] mx-auto">
    {#if $scrambleData && $scrambleData.length > 0}
        <div class="flex justify-end w-full">
            {#if selectMode}
                <div class="flex items-center justify-end gap-2 w-full">
                    <div class="mr-auto relative">
                        <button on:click={toggleOptions}
                                class="rounded-md bg-violet-200 hover:bg-violet-300 text-violet-700 font-medium transition-colors duration-300 ease-in-out p-1 flex justify-center items-center">
                            <span class="i-[tabler--dots] text-lg"/>
                        </button>
                        {#if showOptions}
                            <CTPopper>
                                {#if $solves.size === 0}
                                    <CTPopperButton on:click={clearSession} color="red" icon="i-[f7--bin-xmark]">
                                        Clear Session
                                    </CTPopperButton>
                                {:else}
                                    <CTPopperButton icon="i-[fluent--warning-32-regular]" dropdown={true}
                                                    options={penaltyOptions}>
                                        Penalty
                                    </CTPopperButton>
                                    <CTPopperSpace />
                                    <CTPopperButton on:click={() => deleteSolves(Array.from($solves))}
                                                    icon="i-[solar--trash-bin-minimalistic-linear]" color="red">
                                        Delete
                                    </CTPopperButton>
                                {/if}
                            </CTPopper>
                        {/if}
                    </div>
                    <CTButton color="primary" on:click={selectAll}>
                        Select All
                    </CTButton>
                    <CTButton on:click={cancel}>
                        Cancel
                    </CTButton>
                </div>
            {:else}
                <CTButton on:click={() => selectMode = true} color="primary">
                    Select
                </CTButton>
            {/if}
        </div>
        <div bind:this={solveContainer} class="grid grid-cols-3 gap-5 w-full">
            {#each $scrambleData as solveData}
                <CTSolveTime on:select={select} onClick={() => showDetail(solveData)} {solveData} {selectMode} />
            {/each}
        </div>

    {:else}
        <p class="text-center whitespace-nowrap">
            No solves on the board yet. Start now and track your progress!
        </p>
    {/if}
</div>
