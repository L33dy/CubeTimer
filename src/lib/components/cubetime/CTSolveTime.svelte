<script lang="ts">
import { Penalty, type Solve } from '$lib/composables'

interface Props {
  onClick?: (() => void) | undefined;
  solveData: Solve;
  selectMode?: boolean;
  select?: (data: Solve) => void;
}

let { onClick = undefined, solveData, selectMode = false, select }: Props = $props()

let solve = $state<HTMLElement>()

let { time, penalty } = $derived(solveData)

function selectSolve() {
  let isSelected = solve?.getAttribute('scrambleData-selected')

  if (isSelected === '') {
    solve?.removeAttribute('scrambleData-selected')
  }
  else {
    solve?.setAttribute('scrambleData-selected', '')
  }

  select?.(solveData)
}
</script>

<button
  bind:this={solve}
  class="transition-all duration-300 ease-in-out rounded-md px-7 py-3 bg-background-alt shadow-sm border-1 border-transparent disabled:hover:border-transparent flex flex-col justify-center items-center h-[54px] outline-none"
  class:hover:border-main={!selectMode}
  disabled={onClick === undefined}
  onclick={() => selectMode ? selectSolve() : onClick?.()}
>
  <span class="font-semibold text-lg">
    { penalty === Penalty.NONE ? time.toFixed(3) : penalty === Penalty.PLUSTWO ? `${time.toFixed(3)}+` : 'DNF' }
  </span>
  <span id="checkmark">
    <span class="i-[bi--check] text-background"></span>
  </span>
</button>

<style lang="postcss">
    #checkmark {
        @apply h-0 w-0 opacity-0 transition-all duration-150 bg-text-alt shadow-md rounded-full flex justify-center items-center;
    }

    :global([scrambleData-selected] > #checkmark) {
        @apply h-4 w-4 opacity-100;
    }
</style>
