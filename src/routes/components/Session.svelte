<script>
    import {cubeType, data} from "$lib/store.js";
    import {onMount} from "svelte";
    import Time from "./Time.svelte";
    import {fade} from "svelte/transition";
    import {deleteFromDatabase, editPenaltyOnDatabase} from "$lib/save.js";

    let typeValue;
    let timesGrid;
    let times;
    let isSelected = false;
    let menuOpened = false;

    onMount(() => {
        updateCubeType()
    })

    function updateCubeType() {
        cubeType.update(type => type = typeValue)
    }

    function checkForTimeSelection() {
        if (!timesGrid) return;

        times = Array.from(timesGrid.children)

        isSelected = times.some(child => child.hasAttribute('data-selected'))
    }

    function deleteSelected() {
        let selectedTimes = times.filter(child => child.hasAttribute('data-selected')).map(child => child.getAttribute('data-time'))

        deleteFromDatabase(selectedTimes)

        unselect()
    }

    function editPenalty(selectedPenalty) {
        let selectedTimes = times.filter(child => child.hasAttribute('data-selected')).map(child => child.getAttribute('data-time'))

        editPenaltyOnDatabase(selectedTimes, parseInt(selectedPenalty))

        unselect()
    }

    function selectAll() {
        times.forEach(child => {
            child.setAttribute('data-selected', '')
        })
    }

    function unselect() {
        times.forEach(child => {
            if (child.hasAttribute('data-selected')) {
                child.removeAttribute('data-selected')
            }
        })

        isSelected = false
        menuOpened = false;
    }

</script>

<svelte:body on:click={checkForTimeSelection}/>

<div class="absolute bottom-10 left-10 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md z-50 w-[385px]">
    <div class="flex justify-start items-center gap-14 w-full relative">
        <h2 class="font-medium">Session 1</h2>
        <select bind:value={typeValue} class="text-violet-600 outline-none cursor-pointer bg-transparent"
                on:change={updateCubeType}>
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
        </select>

        {#if isSelected}
            <button transition:fade={{duration: 200}} on:click={selectAll}
                    class="ml-auto bg-violet-200 rounded-md text-violet-600 px-1.5">
                Select All
            </button>
        {/if}

        {#if isSelected}
            <div transition:fade={{duration: 200}}
                 class="absolute -top-2.5 -right-5 translate-x-full bg-gray-50 shadow-md rounded-md px-3 py-2.5 flex flex-col justify-start items-start gap-6">
                <div class="flex justify-center items-center gap-2 child:bg-gray-200 child-hover:bg-gray-300 child:transition-colors child:duration-300 child:rounded-md child:px-2">
                    <button on:click={() => editPenalty(0)}>OK</button>
                    <button on:click={() => editPenalty(1)}>+2</button>
                    <button on:click={() => editPenalty(2)}>DNF</button>
                </div>
                <button on:click={deleteSelected} class="font-medium text-red-600 hover:text-red-800 self-center">
                    Delete
                </button>
            </div>
        {/if}
    </div>
    {#if $data && $data?.data.length > 0}
        <div bind:this={timesGrid} class="grid grid-cols-3 max-h-[172px] overflow-y-auto gap-2 w-full">
            {#each $data.data as d}
                <Time time={d.time} penalty={d.penalty}/>
            {/each}
        </div>
    {/if}
</div>