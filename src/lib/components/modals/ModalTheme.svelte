<script lang="ts">
import { getCurrentThemeName, loadTheme, type Theme } from '$composables'
import themesData from '$lib/json/themes.json'
import type { ThemeModal } from '$packages/modal/types'
import { closeCurrentModal } from '$packages/modal/index.svelte'

let modal: ThemeModal = $props()
let themes = $derived<Theme[]>(themesData.sort((a, b) => a.name.localeCompare(b.name)))

function selectTheme(themeName: string) {
  loadTheme(themeName)

  modal.onConfirm?.()
  modal.onCancel?.()

  closeCurrentModal()
}
</script>

<div class="flex flex-col gap-2 py-2">
  {#each themes as theme}
    <button
      class="flex items-center justify-between w-full px-4 py-0.5 transition-colors duration-200 hover:bg-text hover:text-background-alt"
      onclick={() => selectTheme(theme.name)}
    >
      <span class="flex items-center gap-2">
        <span
          class:opacity-100={getCurrentThemeName() === theme.name}
          class="i-[ri--check-fill] opacity-0"
        ></span>
        <span>
          { theme.name }
        </span>
      </span>
      <span class="flex items-center gap-1 p-1.5" style="background-color: {theme.backgroundAlt};">
        <span class="w-2.5 aspect-square" style="background-color: {theme.main}"></span>
        <span class="w-2.5 aspect-square" style="background-color: {theme.textAlt}"></span>
        <span class="w-2.5 aspect-square" style="background-color: {theme.text}"></span>
      </span>
    </button>
  {/each}
</div>
