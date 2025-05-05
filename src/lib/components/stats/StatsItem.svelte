<script lang="ts">
import type { Snippet } from 'svelte'

interface Item {
  title?: string
  value?: number
}

interface Props {
  color?: 'primary' | 'secondary' | 'main'
  children?: Snippet
  content?: Snippet
  class?: string
  items?: Item[]
  noRenderItems?: boolean
}

let { color = 'primary', children, content, class: klass, items = [], noRenderItems = false }: Props = $props()
</script>

<div
  class:primary="{color === 'primary'}" class:main="{color === 'main'}" class:secondary="{color === 'secondary'}"
  class="rounded-xl p-3 w-full h-full flex {klass}"
>
  <div class="flex flex-col gap-1 w-full">
    <span
      class:text-text={color === 'secondary'}
      class:text-background={color === 'primary'}
      class="uppercase text-sm font-semibold text-left"
    >
      {@render children?.()}
    </span>
    {#if !noRenderItems}
      <div class="flex flex-col">
        {#if items.length > 1}
          {#each items as item}
            <div class="flex flex-col">
              {#if item?.title}
                <span class="text-sm text-background/70 font-semibold">
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
              <span class="text-sm font-medium text-background/70">
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
  .primary {
    @apply bg-text-alt text-text;
  }

  .main {
    @apply bg-gradient-to-r from-main/55 to-main text-white;
  }

  .secondary {
      @apply bg-background-alt;
  }
</style>
