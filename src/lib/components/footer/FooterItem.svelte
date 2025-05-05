<script lang="ts">
import type { Snippet } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

interface Props {
  children?: Snippet
  href?: string
  icon?: string
  onclick?: MouseEventHandler<HTMLAnchorElement>
}

let { children, href, icon, onclick }: Props = $props()
</script>

<a {href} {onclick} class="flex items-center gap-2 text-sm text-text-alt hover:text-text transition-colors duration-300 cursor-pointer">
  <span class="{icon}"></span>
  <span>
    {@render children?.()}
  </span>
</a>
