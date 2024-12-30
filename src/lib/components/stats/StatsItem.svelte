<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  color?: 'primary' | 'secondary'
  children?: Snippet
  class?: string
}

let { color = 'primary', children, class: klass }: Props = $props()
</script>

<div
  class:primary={color === 'primary'} class:secondary={color === 'secondary'}
  class="rounded-lg p-2 w-full h-full flex {klass}"
>
  {@render children?.()}
</div>

<style lang="postcss">
  .primary {
    @apply bg-white text-black;
  }

  .secondary {
    @apply bg-gradient-to-r from-violet-400 to-violet-500 text-white;
  }
</style>
