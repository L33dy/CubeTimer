<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  name: string;
  icon?: string | undefined;
  children?: Snippet
}

let { name, icon = undefined, children }: Props = $props()
</script>

<div class="flex flex-col gap-6 max-w-3xl mx-auto w-full">
  <div class="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold">
      {name}
    </h2>
    {#if icon}
      <span class={`${icon} text-5xl`}></span>
    {/if}
  </div>

  {@render children?.()}
</div>
