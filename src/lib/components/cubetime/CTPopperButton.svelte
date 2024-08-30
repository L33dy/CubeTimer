<script lang="ts">
    import type {PopperOption} from "$lib/types/popper.type";
    import {slide} from "svelte/transition";

    export let icon: string | undefined = undefined;
    export let color: 'red' | 'grey' = 'grey';
    export let select: boolean = false;
    export let options: PopperOption[] = [];

    let optionsVisible: boolean = false;
</script>

<button on:click
        on:click={() => select ? optionsVisible = !optionsVisible : null}
        class:red={color === 'red'}
        class:grey={color === 'grey'}
        class:!px-1.5={select}
        class="flex items-center justify-between hover:bg-gray-100 transition-colors duration-300 ease-in-out py-0.5 px-2.5 w-full">
    <span class:font-medium={select && optionsVisible} class="flex items-center gap-1.5">
        {#if select}
            <span class:rotate-90={optionsVisible} class="i-[majesticons--chevron-right] text-lg transition-transform duration-150" />
        {/if}
        <slot />
    </span>
    {#if icon}
        <span class={`${icon} text-lg`} />
    {/if}
</button>

{#if select && optionsVisible && options.length > 0}
    <div transition:slide={{duration: 200}} class="flex flex-col">
        {#each options as o}
            <button on:click={o.onClick}
                    class="flex items-center justify-between hover:bg-gray-100 transition-colors duration-300 ease-in-out py-1 pl-7 pr-1.5 border-t-1 border-gray-200">
                {o.name}
                {#if o.icon}
                    <span class={`${o.icon} text-lg`} />
                {/if}
            </button>
        {/each}
    </div>
{/if}

<style lang="postcss">
    .red {
        @apply text-red-500;
    }

    .grey {
        @apply text-gray-800;
    }
</style>
