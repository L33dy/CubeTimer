<script lang="ts" module>
export interface Changelog {
  version: string
  date: string
  description?: string
  add?: string[]
  update?: string[]
  fix?: string[]
}
</script>

<script lang="ts">
import changelogData from '$lib/json/changelog.json'
import ChangelogItem from '$lib/components/modals/changelog/ChangelogItem.svelte'

let data: Changelog[] = changelogData.reverse()
</script>

<div class="flex flex-col gap-8 p-2 max-h-[520px] overflow-y-auto">
  <h2 class="text-lg font-medium">
    Release Notes
  </h2>
  <div class="flex flex-col gap-12">
    {#each data as d}
      <ChangelogItem {...d} />
    {/each}
  </div>
</div>
