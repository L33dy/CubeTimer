<script lang="ts">
import type { ThemeModal } from '$packages/modal/types'
import { loadTheme, type Theme } from '$composables'
import themesData from '$lib/json/themes.json'

let modal: ThemeModal = $props()
let themes = $derived<Theme[]>(themesData)
</script>

<div class="flex flex-col gap-2">
  {#each themes as theme}
    <button onclick={() => loadTheme(theme.name)}>
      { theme.name }
    </button>
  {/each}
</div>
