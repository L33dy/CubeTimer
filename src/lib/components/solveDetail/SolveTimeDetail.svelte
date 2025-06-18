<script lang="ts">
import { fade, scale } from 'svelte/transition'
import CTButton from '$lib/components/cubetime/CTButton.svelte'
import ScrambleDisplay from '$lib/components/solves/ScrambleDisplay.svelte'
import toast from 'svelte-french-toast'
import { addNote, deleteSolve, editPenalty, Penalty, type Solve } from '$lib/composables'
import { untrack } from 'svelte'

interface Props {
  solveData: Solve;
  hide: () => void;
}

let { solveData, hide }: Props = $props()

let { date, time, scramble, puzzleType, penalty, note } = $derived(solveData)
let commentInput = $state<string>(untrack(() => note))

async function copyScramble() {
  await toast.promise <void>(
    navigator.clipboard.writeText(scramble),
    {
      loading: 'Copying...',
      success: 'Scramble copied!',
      error: 'Could not copy :(',
    }
  )
}

function closeDetail() {
  addNote(solveData, commentInput)

  hide?.()
}
</script>

<div
  tabindex="0" role="button" onkeypress={closeDetail}
  class="w-screen h-screen bg-background/10 backdrop-blur-md z-50 fixed top-0 left-0 cursor-default" onclick={closeDetail}
  transition:fade={{ duration: 150 }}
></div>

<div
  class="flex flex-col bg-background rounded-md border-1 border-text-alt absolute
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 px-4 pt-2 pb-4" in:scale={{ delay: 150 }} out:scale
>
  <div class="flex items-center justify-between border-b-1 border-b-text">
    {#if penalty === Penalty.NONE}
      <span class="font-semibold text-2xl font-mono">
        {time.toFixed(3)}
      </span>
    {:else if penalty === Penalty.PLUSTWO}
      <div class="flex items-center gap-2">
        <span class="font-semibold text-2xl font-mono">
          {(time + 2).toFixed(3)}
        </span>
        <span class="text-text-alt text-sm">
          ({time.toFixed(3)}+)
        </span>
      </div>
    {:else if penalty === Penalty.DNF}
      <span class="font-semibold text-2xl font-mono">
        DNF
      </span>
    {/if}
    <span class="font-medium capitalize">
      {puzzleType}
    </span>
  </div>
  <div class="flex">
    <p class="text-text-alt text-sm">
      {new Date(date).toLocaleDateString('en-US')} {new Date(date).toLocaleTimeString('en-US')}
    </p>
  </div>
  <div class="flex flex-col justify-center items-center gap-8 pt-8">
    <p class="text-center font-medium text-lg font-mono">
      {scramble}
    </p>
    <ScrambleDisplay {puzzleType} {scramble}/>
    <div class="flex justify-end items-center w-full gap-2">
      <CTButton
        disabled={penalty === Penalty.NONE} icon="i-[fluent--checkmark-circle-12-regular]"
        onclick={() => editPenalty(solveData, Penalty.NONE)} size="small"
      >
        OK
      </CTButton>
      <CTButton
        disabled={penalty === Penalty.PLUSTWO} icon="i-[mynaui--two-circle]"
        onclick={() => editPenalty(solveData, Penalty.PLUSTWO)} size="small"
      >
        +2
      </CTButton>
      <CTButton
        disabled={penalty === Penalty.DNF} icon="i-[jam--close-circle]"
        onclick={() => editPenalty(solveData, Penalty.DNF)} size="small"
      >
        DNF
      </CTButton>
    </div>
  </div>
  <div class="flex flex-col gap-2 mt-auto w-full">
    <p class="font-medium uppercase border-b-1 border-b-text">
      Note
    </p>
    <textarea bind:value={commentInput} placeholder="Add a note..."></textarea>
  </div>
  <div class="flex justify-end items-center gap-2 pt-4">
    <CTButton color="primary" icon="i-[prime--copy]" onclick={copyScramble}>
      Copy Scramble
    </CTButton>
    <CTButton color="red" icon="i-[solar--trash-bin-trash-linear]" onclick={() => deleteSolve(solveData)}>
      Delete
    </CTButton>
  </div>
  <button
    aria-label="Close detail"
    class="absolute -top-10 -right-10 bg-background border-1 border-text-alt hover:border-background-alt hover:bg-text hover:text-background-alt transition-colors duration-300 rounded-full w-8 h-8 flex justify-center items-center"
    onclick={closeDetail}
  >
    <span class="i-[material-symbols--close]"></span>
  </button>
</div>

<style lang="postcss">
    textarea {
        @apply w-full outline-none bg-background border-1 border-text-alt rounded-md h-24 px-2 py-1 text-sm resize-none;
    }
</style>
