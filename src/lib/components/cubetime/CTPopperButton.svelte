<script lang="ts" module>
export interface PopperOption {
  name: string
  icon?: string
  onClick?: () => void
}
</script>

<script lang="ts">
import { slide } from 'svelte/transition'
import type { Snippet } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

interface Props {
  icon?: string | undefined;
  color?: 'red' | 'grey';
  dropdown?: boolean;
  options?: PopperOption[];
  children?: Snippet;
  onclick?: MouseEventHandler<HTMLButtonElement>;
}

let {
  icon = undefined,
  color = 'grey',
  dropdown = false,
  options = [],
  children,
  onclick,
}: Props = $props()

let optionsVisible: boolean = $state(false)

function handleClick(e: MouseEvent) {
  onclick?.(e)

  if (dropdown) {
    optionsVisible = !optionsVisible
  }
}
</script>

<button
  onclick={handleClick}
  class:red={color === 'red'}
  class:grey={color === 'grey'}
  class:!px-1.5={dropdown}
  class="flex items-center justify-between hover:bg-gray-100 transition-colors duration-300 ease-in-out py-1.5 px-2.5 w-full"
>
  <span class:font-medium={dropdown && optionsVisible} class="flex items-center gap-1.5">
    {#if dropdown}
      <span class:rotate-90={optionsVisible} class="i-[majesticons--chevron-right] text-lg transition-transform duration-150"></span>
    {/if}
    {@render children?.()}
  </span>
  {#if icon}
    <span class={`${icon} text-lg`}></span>
  {/if}
</button>

{#if dropdown && optionsVisible && options.length > 0}
  <div transition:slide={{ duration: 200 }} class="flex flex-col">
    {#each options as o}
      <button
        onclick={o.onClick}
        class="flex items-center justify-between hover:bg-gray-100 transition-colors duration-300 ease-in-out py-1.5 pl-7 pr-1.5 border-t-1 border-gray-200"
      >
        {o.name}
        {#if o.icon}
          <span class={`${o.icon} text-lg`}></span>
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
