<script lang="ts">
    import {scrambleData} from "$lib/store";
    import Solve from "$lib/components/solves/Solve.svelte";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";

    let toggleEdit = false;

    let timesContainer: HTMLElement;
    let areSelected = false;

    function selectAll(): void {
        areSelected = !areSelected;

        const children = timesContainer.children;

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

    function cancel() {
        const children = timesContainer.children;

        for (let i = 0; i < children.length; i++) {
            children[i].removeAttribute('data-selected')
        }

        toggleEdit = false
        areSelected = false
    }
</script>

<div class="flex flex-col justify-center items-center gap-10 w-[400px] mx-auto">
    <div class="flex justify-end w-full">
        {#if toggleEdit}
            <div class="flex justify-end gap-2 w-full">
                <div class="mr-auto">
                    <CTButton color="primary">
                        <span class="i-[tabler--dots] text-violet-600 text-lg" />
                    </CTButton>
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
                <Solve {solveData} editable={toggleEdit} />
            {/each}
        </div>
    {/if}
</div>
