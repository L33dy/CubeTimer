<script lang="ts">
    import {cubeType, scrambleData} from "$lib/store";
    import {onMount} from "svelte";
    import Time from "./Time.svelte";

    let typeValue: string;

    onMount(() => {
        updateCubeType()
    })

    function updateCubeType() {
        $cubeType = typeValue;
    }
</script>

<div class="absolute bottom-10 left-10 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md w-96 z-50">
    <div class="flex justify-between items-center gap-4 w-full relative">
        <h2 class="font-medium">Session 1</h2>
        <select bind:value={typeValue} class="text-violet-600 outline-none cursor-pointer bg-transparent text-end"
                on:change={updateCubeType}>
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
            <option value="4x4">4x4</option>
            <option value="5x5">5x5</option>
            <option value="6x6">6x6</option>
            <option value="7x7">7x7</option>
            <option value="pyraminx">Pyraminx</option>
            <option value="megaminx">Megaminx</option>
            <option value="skewb">Skewb</option>
            <option value="clock">Magic Clock</option>
        </select>
    </div>
    {#if $scrambleData && $scrambleData.length > 0}
        <div class="grid grid-cols-3 max-h-[172px] overflow-y-auto gap-2 w-full">
            {#each $scrambleData as scramble}
                <Time time={scramble.time} penalty={scramble.penalty} />
            {/each}
        </div>
    {/if}
</div>
