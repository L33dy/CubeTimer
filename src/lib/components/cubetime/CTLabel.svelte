<script lang="ts">
import type { Snippet } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

interface Props {
  onclick?: MouseEventHandler<HTMLButtonElement>
  children?: Snippet
}

let { children, onclick }: Props = $props()
</script>

<button {onclick} class="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-md px-1.5 py-1 flex justify-center items-center">
  <span class="text-xs text-gray-500 font-semibold">
    {@render children?.()}
  </span>
</button>
