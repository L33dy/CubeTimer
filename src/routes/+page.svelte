<script lang="ts">
import { fade } from 'svelte/transition'
import { scramble } from 'cube-scramble.js'
import Session from '$lib/components/Session.svelte'
import Stats from '$lib/components/Stats.svelte'
import CTButton from '$lib/components/cubetime/CTButton.svelte'
import {
  cancelInspection,
  InspectionState, inspectionTime,
  isValidTime,
  saveData,
  scrambleData,
  settings, time,
  type TimerSettings, TimerState, timerState,
  togglePrepare,
  toggleStart
} from '$lib/composables'

let timerSettings = $derived<TimerSettings>(settings.value.timerSettings)

function keyDown(e: KeyboardEvent): void {
  if (e.code === 'Enter') {
    generateNewSequence()
  }
}

function generateNewSequence(): void {
  scrambleData.sequence = scramble(scrambleData.puzzleType).join(' ')
}

function saveTime(e: SubmitEvent): void {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const time = formData.get('time') as string

  if(isValidTime(time)) saveData(parseFloat(time), scrambleData.sequence, scrambleData.puzzleType)

  form.reset()
}

$effect(() => {
  if (scrambleData.scrambles || scrambleData.puzzleType) {
    generateNewSequence()
  }
})
</script>

<svelte:body onkeydown={(e) => {keyDown(e); togglePrepare(e)}} onkeyup={toggleStart}/>

<Session/>
<Stats/>

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-3/4 relative">
  {#key scrambleData.sequence}
    <p
      in:fade={{ duration: 450 }}
      class:opacity-0={timerState.timer !== TimerState.IDLE || timerState.inspection !== InspectionState.NONE}
      class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default"
    >
      {scrambleData.sequence}
    </p>
  {/key}
</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  {#if timerSettings.timerMode === 'timer'}
    {#if timerState.inspection === InspectionState.NONE}
      <p
        class:text-black={timerState.timer === TimerState.IDLE || timerState.timer === TimerState.RUNNING}
        class:text-red-500={timerState.timer === TimerState.PREPARING}
        class:text-green-500={timerState.timer === TimerState.PREPARED}
        class="text-6xl font-bold transition-all duration-300 ease-in-out"
        class:scale-150={timerState.timer === TimerState.RUNNING}
      >
        {`${time.value.seconds}.${time.value.milliseconds.toString().padStart(3, '0')}`}
      </p>
    {:else}
      <div in:fade={{ duration: 200 }} class="flex flex-col justify-center items-center gap-4">
        <p class="text-6xl font-bold w-fit">
          {inspectionTime.value}
        </p>
        {#if timerSettings.showCancelInspection}
          <CTButton onclick={cancelInspection} color="white">
            Cancel
          </CTButton>
        {/if}
      </div>
    {/if}
  {:else}
    <form onsubmit={(e) => saveTime(e)} autocomplete="off">
      <input type="text" maxlength="6" placeholder="0.00" name="time" class="timer-input" />
    </form>
  {/if}
</div>

<style lang="postcss">
    .timer-input {
        @apply outline-none bg-transparent text-6xl text-center;
    }
</style>
