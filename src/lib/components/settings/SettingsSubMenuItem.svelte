<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  title?: Snippet
  children?: Snippet
}

let { title, children }: Props = $props()
</script>

<div class="w-full flex items-center justify-between">
  <div class="font-medium">
    {@render title?.()}
  </div>
  {@render children?.()}
</div>
