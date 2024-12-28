<script lang="ts">
import CTButton from '$lib/components/cubetime/CTButton.svelte'
import CTPopper from '$lib/components/cubetime/CTPopper.svelte'
import CTPopperButton, { type PopperOption } from '$lib/components/cubetime/CTPopperButton.svelte'
import CTSolveTime from '$lib/components/cubetime/CTSolveTime.svelte'
import CTPopperSpace from '$lib/components/cubetime/CTPopperSpace.svelte'
import { clearData, deleteSolves, editPenalty, Penalty, scrambleData, showDetail, type Solve } from '$lib/composables'
import { SvelteSet } from 'svelte/reactivity'

let solves = $state(new SvelteSet<Solve>())
let solveContainer = $state<HTMLElement>()

let selectMode = $state(false)
let showOptions = $state(false)

const penaltyOptions: PopperOption[] = [
  {
    name: 'No Penalty',
    icon: 'i-[fluent--checkmark-circle-12-regular]',
    onClick: () => editPenalty(Array.from(solves), Penalty.NONE),
  },
  {
    name: '+2',
    icon: 'i-[mynaui--two-circle]',
    onClick: () => editPenalty(Array.from(solves), Penalty.PLUSTWO),
  },
  {
    name: 'DNF',
    icon: 'i-[jam--close-circle]',
    onClick: () => editPenalty(Array.from(solves), Penalty.DNF),
  }
]

function select(data: Solve) {
  if (solves.has(data)) {
    solves.delete(data)
  }
  else {
    solves.add(data)
  }
}

function selectAll() {
  const solvesChildren = solveContainer?.children

  for (const solve of solvesChildren) {
    solve.setAttribute('scrambleData-selected', '')
  }

  solves = new SvelteSet(scrambleData.scrambles)
}

function cancel() {
  selectMode = false
  showOptions = false

  const solvesChildren = solveContainer?.children

  for (const solve of solvesChildren) {
    solve.removeAttribute('scrambleData-selected')
  }

  solves = new SvelteSet()
}

function clearSession(): void {
  clearData()
}

function toggleOptions(): void {
  showOptions = !showOptions
}
</script>

<div class="flex flex-col justify-center items-center gap-10 w-[400px] mx-auto">
  {#if scrambleData.scrambles.length > 0}
    <div class="flex justify-end w-full">
      {#if selectMode}
        <div class="flex items-center justify-end gap-2 w-full">
          <div class="mr-auto relative">
            <button
              aria-label="Other options"
              onclick={toggleOptions}
              class="rounded-md bg-violet-200 hover:bg-violet-300 text-violet-700 font-medium transition-colors duration-300 ease-in-out p-1 flex justify-center items-center"
            >
              <span class="i-[tabler--dots] text-lg"></span>
            </button>
            {#if showOptions}
              <CTPopper>
                {#if solves.size === 0}
                  <CTPopperButton onclick={clearSession} color="red" icon="i-[f7--bin-xmark]">
                    Clear Session
                  </CTPopperButton>
                {:else}
                  <CTPopperButton
                    icon="i-[fluent--warning-32-regular]" dropdown={true}
                    options={penaltyOptions}
                  >
                    Penalty
                  </CTPopperButton>
                  <CTPopperSpace />
                  <CTPopperButton
                    onclick={() => deleteSolves(Array.from(solves))}
                    icon="i-[solar--trash-bin-minimalistic-linear]" color="red"
                  >
                    Delete
                  </CTPopperButton>
                {/if}
              </CTPopper>
            {/if}
          </div>
          <CTButton color="primary" onclick={selectAll}>
            Select All
          </CTButton>
          <CTButton onclick={cancel}>
            Cancel
          </CTButton>
        </div>
      {:else}
        <CTButton onclick={() => selectMode = true} color="primary">
          Select
        </CTButton>
      {/if}
    </div>
    <div bind:this={solveContainer} class="grid grid-cols-3 gap-5 w-full">
      {#each scrambleData.scrambles as solveData}
        <CTSolveTime select={(data) => select(data)} onClick={() => showDetail(solveData)} {solveData} {selectMode} />
      {/each}
    </div>

  {:else}
    <p class="text-center whitespace-nowrap">
      No solves on the board yet. Start now and track your progress!
    </p>
  {/if}
</div>
