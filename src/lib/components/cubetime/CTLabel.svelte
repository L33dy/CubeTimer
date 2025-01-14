<script lang="ts">
import type { Snippet } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

interface Props {
  color?: 'primary' | 'secondary'
  onclick?: MouseEventHandler<HTMLButtonElement>
  children?: Snippet
}

let { color = 'primary', children, onclick }: Props = $props()
</script>

<button
  {onclick} disabled={!onclick}
  class:primary={color === 'primary'} class:secondary={color === 'secondary'}
  class="transition-colors duration-300 rounded-md px-1.5 py-0.5 flex justify-center items-center text-sm font-bold"
>
  {@render children?.()}
</button>

<style lang="postcss">
  .primary {
      @apply bg-gray-100 enabled:hover:bg-gray-200 text-gray-500;
  }

  .secondary {
      @apply bg-primary-500 text-white;
  }
</style>
