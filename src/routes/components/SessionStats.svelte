<script>
    import {cubeType, data} from "$lib/store.js";
    import {onMount} from "svelte";
    import Time from "./Time.svelte";
    import {fade} from "svelte/transition";

    let typeValue;
    let timesGrid;
    let isSelected;

    onMount(() => {
        updateCubeType()
    })

    function updateCubeType() {
        cubeType.update(type => type = typeValue)
    }

    function checkForTimeSelection() {
        let times = Array.from(timesGrid.children)
        isSelected = times.some(child => child.hasAttribute('data-selected'))
    }
</script>

<svelte:body on:click={checkForTimeSelection} />

<div class="absolute bottom-10 left-10 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md z-50">
    <div class="flex justify-start items-center gap-14 w-full">
        <h2 class="font-medium">Session 1</h2>
        <select bind:value={typeValue} on:change={updateCubeType} class="text-violet-600 outline-none cursor-pointer bg-transparent">
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
        </select>
        {#if isSelected}
            <button transition:fade={{duration: 200}} class="ml-auto w-6 bg-violet-200 hover:bg-violet-300 transition-colors duration-500 ease-in-out rounded-md p-1">
                <img src="../../../icons/dots-menu.svg" alt="dots menu" class="w-full h-full">
            </button>
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