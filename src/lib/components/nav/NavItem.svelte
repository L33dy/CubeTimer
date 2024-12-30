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
  <span class="{icon} text-2xl"></span>
  <span>
    {@render children?.()}
  </span>
</a>

<style lang="postcss">
    a {
        @apply flex justify-start items-center gap-3 w-full text-lg font-medium transition-opacity duration-300;
    }

    a:not(.active) {
        @apply opacity-50;
    }

    a:not(.active):hover {
        @apply opacity-65;
    }
</style>
