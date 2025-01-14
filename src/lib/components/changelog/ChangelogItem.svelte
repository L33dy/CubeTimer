<script lang="ts">
import CTLabel from '$lib/components/cubetime/CTLabel.svelte'
import type { Changelog } from '$packages/changelog/index.svelte'
import ChangelogItemSection from '$components/changelog/ChangelogItemSection.svelte'

let { version, date, description, add, fix, update }: Changelog = $props()

let changelogDate = $derived(new Date(date).toLocaleDateString('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
}))
</script>

<div class="flex flex-col gap-6 text-sm">
  <div class="flex items-center justify-between">
    <CTLabel color="secondary">
      v{version}
    </CTLabel>
    <span class="text-gray-400">
      {changelogDate}
    </span>
  </div>
  {#if description}
    <p class="text-gray-700">
      {description}
    </p>
  {/if}
  {#if add}
    <ChangelogItemSection class="text-green-500" icon="i-[ri--add-line]"items={add}>
      ADD
    </ChangelogItemSection>
  {/if}
  {#if update}
    <ChangelogItemSection class="text-blue-600" icon="i-[ri--arrow-up-fill]" items={update}>
      UPDATE
    </ChangelogItemSection>
  {/if}
  {#if fix}
    <ChangelogItemSection class="text-red-500 text-sm" icon="i-[ri--settings-fill]" items={fix}>
      FIX
    </ChangelogItemSection>
  {/if}
</div>
