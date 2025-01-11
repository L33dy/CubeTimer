<script lang="ts">
import type { Changelog } from '$lib/components/modals/ModalChangelog.svelte'
import CTLabel from '$lib/components/cubetime/CTLabel.svelte'

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
      {version}
    </CTLabel>
    <span class="text-gray-400">
      {changelogDate}
    </span>
  </div>
  {#if description}
    <p>
      {description}
    </p>
  {/if}
  {#if add}
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <div class="flex justify-center items-center bg-gray-100 w-5 aspect-square rounded-md">
          <span class="i-[ri--add-line] text-green-600 text-lg"></span>
        </div>
        <h3 class="font-semibold text-base text-gray-800">
          ADD
        </h3>
      </div>
      <div class="flex flex-col gap-2">
        {#each add as a}
          <p>
            {a}
          </p>
        {/each}
      </div>
    </div>
  {/if}
  {#if update}
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <div class="flex justify-center items-center bg-gray-100 w-5 aspect-square rounded-md">
          <span class="i-[ri--arrow-up-fill] text-blue-600 text-base"></span>
        </div>
        <h3 class="font-semibold text-base text-gray-800">
          UPDATE
        </h3>
      </div>
      <div class="flex flex-col gap-2">
        {#each update as u}
          <p>
            {u}
          </p>
        {/each}
      </div>
    </div>
  {/if}
  {#if fix}
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <div class="flex justify-center items-center bg-gray-100 w-5 aspect-square rounded-md">
          <span class="i-[ri--settings-fill] text-red-500 text-xs"></span>
        </div>
        <h3 class="font-semibold text-base text-gray-800">
          FIX
        </h3>
      </div>
      <div class="flex flex-col gap-2">
        {#each fix as f}
          <p>
            {f}
          </p>
        {/each}
      </div>
    </div>
  {/if}
</div>
