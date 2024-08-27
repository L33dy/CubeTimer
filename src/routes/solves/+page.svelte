<script lang="ts">
    import {scrambleData} from "$lib/store";
    import Solve from "$lib/components/solves/Solve.svelte";

    let toggleEdit = false;

    let timesContainer: HTMLElement;
    let areSelected = false;

    function selectAll(): void {
        areSelected = !areSelected;

        let children = timesContainer.children;

        if (areSelected) {
            for (let i = 0; i < children.length; i++) {
                children[i].setAttribute('data-selected', '')
            }
        }
        else {
            for (let i = 0; i < children.length; i++) {
                children[i].removeAttribute('data-selected')
            }
        }
    }
</script>

<div class="flex flex-col justify-center items-center gap-10 w-[400px] mx-auto">
    <div class="flex justify-end w-full">
        {#if toggleEdit}
            <div class="flex justify-end gap-2 w-full">
                <button class="rounded-sm bg-violet-200 hover:bg-violet-300 transition-colors duration-300 ease-in-out px-1.5 mr-auto">
                    <img src="../../../icons/dots-menu.svg" alt="dots menu" class="w-5">
                </button>
                <button on:click={selectAll} class="rounded-sm font-medium text-violet-600 bg-violet-200 hover:bg-violet-300 px-3 py-0.5 transition-colors duration-300 ease-in-out">Select All</button>
                <button on:click={() => toggleEdit = false} class="rounded-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 px-3 py-0.5 transition-colors duration-300 ease-in-out">Cancel</button>
            </div>
        {:else}
            <button on:click={() => toggleEdit = true} class="rounded-sm font-medium text-violet-600 bg-violet-200 hover:bg-violet-300 px-3 py-0.5 transition-colors duration-300 ease-in-out">Select</button>
        {/if}
    </div>
    {#if $scrambleData && $scrambleData?.data.length > 0}
        <div bind:this={timesContainer} class="grid grid-cols-3 gap-5 w-full">
            {#each $scrambleData.data as d}
                {#if toggleEdit}
                    <Solve solveData={d} />
                    {:else}
                    <button class="h-[60px] max-h-[60px] bg-white px-8 rounded-md shadow-md cursor-default">
                        <span class="text-lg font-medium">{d.time}</span>
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
</div>
