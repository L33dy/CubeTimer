<script lang="ts">
import { fade, fly } from 'svelte/transition'
import { changelog, closeChangelog } from '$packages/changelog/index.svelte'
import ChangelogItem from '$components/changelog/ChangelogItem.svelte'

console.log(changelog.data)
</script>

<div
  class="w-screen h-screen bg-black/40 z-50 fixed top-0 left-0 cursor-default" role="button" tabindex="0"
  onclick={closeChangelog} onkeypress={closeChangelog}
  transition:fade={{ duration: 150 }}
></div>

<div
  transition:fly={{ y: -35 }}
  class="flex flex-col gap-8 bg-white rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-10 w-[520px]"
>
  <h2 class="font-semibold text-lg">
    Release Notes
  </h2>
  <div class="flex flex-col gap-12 max-h-[620px] overflow-y-auto">
    {#each changelog.data as data}
      <ChangelogItem {...data} />
    {/each}
  </div>
</div>
