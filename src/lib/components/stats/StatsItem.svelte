<script lang="ts">
import type { Snippet } from 'svelte'

interface Item {
  title?: string
  value?: number
}

interface Props {
  color?: 'white' | 'gray' | 'violet'
  children?: Snippet
  content?: Snippet
  class?: string
  items?: Item[]
  noRenderItems?: boolean
}

let { color = 'white', children, content, class: klass, items = [], noRenderItems = false }: Props = $props()
</script>

<div
  class:white={color === 'white'} class:violet={color === 'violet'} class:gray={color === 'gray'}
  class="rounded-xl p-3 w-full h-full flex {klass}"
>
  <div class="flex flex-col gap-1 w-full">
    <span
      class:text-white={color === 'violet'} class:!font-medium={color === 'violet'}
      class="uppercase text-sm text-gray-500 font-semibold text-left"
    >
      {@render children?.()}
    </span>
    {#if !noRenderItems}
      <div class="flex flex-col">
        {#if items.length > 1}
          {#each items as item}
            <div class="flex flex-col">
              {#if item?.title}
                <span class="text-sm font-semibold text-gray-500">
                  {item.title}
                </span>
              {/if}
              <span class="font-bold text-2xl">
                {item?.value ?? '-'}
              </span>
            </div>
          {/each}
        {:else}
          <div class="flex flex-col">
            {#if items[0]?.title}
              <span class="text-sm font-medium text-gray-500">
                {items[0].title}
              </span>
            {/if}
            <span class="font-bold text-4xl text-left">
              {items[0]?.value ?? '-'}
            </span>
          </div>
        {/if}
      </div>

    {:else}
      {@render content?.()}
    {/if}
  </div>
</div>

<style lang="postcss">
  .white {
    @apply bg-white text-black;
  }

  .violet {
    @apply bg-gradient-to-r from-violet-400/70 to-violet-500 text-white;
  }

  .gray {
      @apply bg-gray-200/50;
  }
</style>
