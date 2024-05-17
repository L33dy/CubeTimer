<script>
    import {cubeType, data} from "$lib/store.js";
    import {onMount} from "svelte";
    import Time from "./Time.svelte";
    import {fade} from "svelte/transition";
    import {deleteFromDatabase} from "$lib/save.js";

    let typeValue;
    let timesGrid;
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

        let times = Array.from(timesGrid.children)
        isSelected = times.some(child => child.hasAttribute('data-selected'))
    }

    function deleteSelected() {
        let times = Array.from(timesGrid.children)
        let selectedTimes = times.filter(child => child.hasAttribute('data-selected')).map(child => {
            let span = child.querySelector('span')
            return span.innerHTML
        })

        deleteFromDatabase(selectedTimes)

        isSelected = false;
    }

    $: if (!isSelected) {
        menuOpened = false;
    }
</script>

<svelte:body on:click={checkForTimeSelection} />

<div class="absolute bottom-10 left-10 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md z-50">
    <div class="flex justify-start items-center gap-14 w-full relative">
        <h2 class="font-medium">Session 1</h2>
        <select bind:value={typeValue} on:change={updateCubeType} class="text-violet-600 outline-none cursor-pointer bg-transparent">
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
        </select>

        {#if isSelected}
            <button transition:fade={{duration: 200}} on:click={() => menuOpened = !menuOpened} class:bg-violet-200={!menuOpened} class:bg-violet-300={menuOpened} class="ml-auto w-6 transition-colors duration-500 ease-in-out rounded-md p-1">
                <img src="../../../icons/dots-menu.svg" alt="dots menu" class="w-full h-full">
            </button>
        {/if}

        {#if menuOpened}
            <div transition:fade={{duration: 200}} class="absolute -top-2.5 -right-5 translate-x-full bg-gray-50 shadow-md rounded-md px-2 py-2.5 flex flex-col justify-start items-start gap-6">
                <div class="flex justify-start items-start gap-8">
                    <label for="penalty-sel">Penalty:</label>
                    <select id="penalty-sel" class="bg-transparent outline-none cursor-pointer">
                        <option value="0">OK</option>
                        <option value="1">+2</option>
                        <option value="2">DNF</option>
                    </select>
                </div>
                <button on:click={deleteSelected} class="font-medium text-red-600 hover:text-red-800 self-center">Delete</button>
            </div>
        {/if}
    </div>
    {#if $data}
        <div bind:this={timesGrid} class="grid grid-cols-3 gap-2">
            {#each $data.data as d}
                <Time time={d.time} />
            {/each}
        </div>
    {/if}
</div>