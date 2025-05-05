<script lang="ts">
import type { Snippet } from 'svelte'
import { page } from '$app/state'

interface Props {
  href?: string
  icon?: string
  children?: Snippet
}

let { icon, children, href }: Props = $props()
</script>

<a {href} class:active={page.url.pathname === href}>
  <span class="{icon} text-xl"></span>
  {#if children}
    <span>
      {@render children()}
    </span>
  {/if}
</a>

<style lang="postcss">
    a {
        @apply flex justify-start items-center gap-3 w-fit text-lg font-medium transition-all duration-300;
    }

    a:not(.active) {
        @apply text-text-alt;
    }

    a:not(.active):hover {
        @apply text-text;
    }
</style>
