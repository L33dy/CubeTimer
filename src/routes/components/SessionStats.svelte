<script>
    import {cubeType, data} from "$lib/store.js";
    import {onMount} from "svelte";
    import Time from "./Time.svelte";

    let typeValue;

    onMount(() => {
        updateCubeType()
    })

    function updateCubeType() {
        cubeType.update(type => type = typeValue)
    }
</script>

<div class="absolute top-40 left-28 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md z-50">
    <div class="flex justify-center items-center gap-14">
        <h2 class="font-medium">Session 1</h2>
        <select bind:value={typeValue} on:change={updateCubeType} class="text-violet-600 outline-none cursor-pointer bg-transparent">
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
        </select>
    </div>
    <div class="grid grid-cols-3 gap-2">
        {#if $data}
            {#each $data.data as d}
                <Time time={d.time} />
            {/each}
        {/if}
    </div>
</div>