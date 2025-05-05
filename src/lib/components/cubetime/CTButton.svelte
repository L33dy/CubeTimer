<script lang="ts">
import type { Snippet } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

interface Props {
  color?: 'primary' | 'red';
  size?: 'small' | 'default';
  icon?: string | undefined;
  disabled?: boolean;
  children?: Snippet
  onclick?: MouseEventHandler<HTMLButtonElement>,
}

let {
  color = 'primary',
  size = 'default',
  icon = undefined,
  disabled = false,
  children,
  onclick,
}: Props = $props()
</script>

<button
  class:primary={color === 'primary'} class:red={color === 'red'}
  class:!text-sm={size === 'small'}
  class="rounded-md font-medium transition-all duration-300 ease-in-out px-1.5 py-0.5 flex justify-center items-center gap-1 outline-none"
  {onclick} {disabled}
>
  {#if icon}
    <span class={`${icon} text-lg`}></span>
  {/if}
  {@render children?.()}
</button>

<style lang="postcss">
    .primary {
        @apply bg-background-alt hover:bg-text hover:text-background-alt;
    }

    .red {
        @apply bg-error/25 hover:opacity-60 text-error;
    }
</style>
