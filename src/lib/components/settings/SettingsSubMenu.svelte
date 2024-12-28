<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  name: string;
  icon?: string | undefined;
  children?: Snippet;
}

let { name, icon = undefined, children }: Props = $props()
</script>

<div class="flex flex-col gap-4 bg-white rounded-lg mx-24 py-1.5 px-2.5">
  <div class="flex items-center gap-2">
    {#if icon}
      <span class={`${icon} text-primary-500 text-2xl`}></span>
    {/if}
    <h3 class="font-semibold text-lg">
      {name}
    </h3>
  </div>
  <div class="flex flex-col gap-2">
    {@render children?.()}
  </div>
</div>
