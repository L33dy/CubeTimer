<script lang="ts">
import { fade } from 'svelte/transition'
import { scramble } from 'cube-scramble.js'
import {
  info,
  InspectionState,
  scrambleData,
  time,
  TimerState, timerState,
  togglePrepare,
  toggleStart
} from '$composables'
import Session from '$components/Session.svelte'
import Stats from '$components/Stats.svelte'
import Timer from '$components/Timer.svelte'

function keyDown(e: KeyboardEvent): void {
  if (e.code === 'Enter') {
    generateNewSequence()

    time.value = {
      total: 0,
      seconds: 0,
      milliseconds: 0,
    }
  }
}

function generateNewSequence(): void {
  const sequence = scramble(scrambleData.puzzleType).join(' ')

  scrambleData.sequence = sequence
  info('Generating new sequence', {
    sequence,
    puzzleType: scrambleData.puzzleType,
  })
}

$effect(() => {
  if (scrambleData.scrambles || scrambleData.puzzleType) {
    generateNewSequence()
  }
})
</script>

<svelte:head>
  <title>CubeTimer</title>
</svelte:head>

<svelte:body onkeydown={(e) => {keyDown(e); togglePrepare(e)}} onkeyup={toggleStart}/>

<Session/>
<Stats/>
<Timer />

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-3/4 relative">
  {#key scrambleData.sequence}
    <p
      in:fade={{ duration: 450 }}
      class:opacity-0={timerState.timer !== TimerState.IDLE || timerState.inspection !== InspectionState.NONE}
      class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default font-mono"
    >
      {scrambleData.sequence}
    </p>
  {/key}
</div>
