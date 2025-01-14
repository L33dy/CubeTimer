<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  children?: Snippet
  items?: string[]
  icon?: string
  class?: string
}

let { children, items = [], icon, class: klass }: Props = $props()
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center gap-3">
    <div class="flex justify-center items-center bg-gray-100 w-5 aspect-square rounded-md">
      <span class="{icon} {klass} text-lg"></span>
    </div>
    <h3 class="font-semibold text-sm text-gray-800">
      {@render children?.()}
    </h3>
  </div>
  <div class="flex flex-col gap-2">
    {#each items as i}
      <p class="text-gray-700">
        {i}
      </p>
    {/each}
  </div>
</div>
