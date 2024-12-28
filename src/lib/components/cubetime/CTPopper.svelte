<script lang="ts">
import { fade } from 'svelte/transition'
import type { Snippet } from 'svelte'

interface Props {
  children?: Snippet;
}

let { children }: Props = $props()
</script>

<div
  transition:fade={{ duration: 100 }}
  class="absolute top-full translate-y-2 bg-white w-52 flex flex-col border-1 border-gray-200 rounded-lg z-10"
>
  <div class="whitespace-nowrap">
    {@render children?.()}
  </div>
</div>
