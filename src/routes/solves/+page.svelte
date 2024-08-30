<script lang="ts">
    import {scrambleData} from "$lib/store";
    import SolveTime from "$lib/components/solves/SolveTime.svelte";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import CTPopper from "$lib/components/cubetime/CTPopper.svelte";
    import {clearData, editPenalty} from "$lib/database";
    import {Penalty, type Solve} from "$lib/types/solve.type";
    import {writable} from "svelte/store";
    import CTPopperButton from "$lib/components/cubetime/CTPopperButton.svelte";
    import type {PopperOption} from "$lib/types/popper.type";
    import {deleteSolves} from "$lib/database.js";

    let solves = writable(new Set<Solve>())

    let toggleEdit = true;
    let showOptions: boolean;

    let timesContainer: HTMLElement;
    let areSelected = false;

    const penaltyOptions: PopperOption[] = [
        {
            name: "No Penalty",
            icon: "i-[fluent--checkmark-circle-12-regular]",
            onClick: () => editPenalty(Array.from($solves), Penalty.None)
        },
        {
            name: "+2",
            icon: "i-[mynaui--two-circle]",
            onClick: () => editPenalty(Array.from($solves), Penalty.PlusTwo)
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

    function selectAll(): void {
        areSelected = !areSelected;

        const children = timesContainer.children;

        for (let i = 0; i < children.length; i++) {
            areSelected ? children[i].setAttribute('data-selected', '') : children[i].removeAttribute('data-selected');
        }

        $solves = areSelected ? new Set($scrambleData) : new Set()
    }

    function cancel() {
        const children = timesContainer.children;

        for (let i = 0; i < children.length; i++) {
            children[i].removeAttribute('data-selected')
        }

        toggleEdit = false
        areSelected = false
    }

    function clearSession(): void {
        clearData()
    }

    function toggleOptions(): void {
        showOptions = !showOptions;
    }
</script>

<div class="flex flex-col justify-center items-center gap-10 w-[400px] mx-auto">
    <div class="flex justify-end w-full">
        {#if toggleEdit}
            <div class="flex items-center justify-end gap-2 w-full">
                <div class="mr-auto relative">
                    <button on:click={toggleOptions} class="rounded-md bg-violet-200 hover:bg-violet-300 text-violet-700 font-medium transition-colors duration-300 ease-in-out p-1 flex justify-center items-center">
                        <span class="i-[tabler--dots] text-lg" />
                    </button>
                    {#if showOptions}
                        <CTPopper>
                            {#if $solves.size === 0}
                                <CTPopperButton on:click={clearSession} color="red" icon="i-[f7--bin-xmark]">
                                    Clear Session
                                </CTPopperButton>
                                {:else}
                                <CTPopperButton icon="i-[fluent--warning-32-regular]" select={true} options={penaltyOptions}>
                                    Penalty
                                </CTPopperButton>
                                <CTPopperButton on:click={() => deleteSolves(Array.from($solves))} icon="i-[solar--trash-bin-minimalistic-linear]" color="red">
                                    Delete
                                </CTPopperButton>
                            {/if}
                        </CTPopper>
                    {/if}
                </div>
                <CTButton on:click={selectAll} color="primary">
                    Select All
                </CTButton>
                <CTButton on:click={cancel}>
                    Cancel
                </CTButton>
            </div>
        {:else}
            <CTButton on:click={() => toggleEdit = true} color="primary">
                Select
            </CTButton>
        {/if}
    </div>
    {#if $scrambleData && $scrambleData.length > 0}
        <div bind:this={timesContainer} class="grid grid-cols-3 gap-5 w-full">
            {#each $scrambleData as solveData}
                <SolveTime on:select={select} {solveData} editable={toggleEdit} />
            {/each}
        </div>
    {/if}
</div>
