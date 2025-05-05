<script lang="ts">
import { fade } from 'svelte/transition'
import {
  cancelInspection,
  InspectionState,
  inspectionTime,
  isValidTime, saveData, scrambleData,
  settings,
  time,
  TimerState,
  timerState
} from '$composables'
import CTButton from '$components/cubetime/CTButton.svelte'
import type { TimerSettings } from '$composables'

let timerSettings = $derived<TimerSettings>(settings.value.timerSettings)

function saveTime(e: SubmitEvent): void {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const time = formData.get('time') as string

  if(isValidTime(time)) saveData(parseFloat(time), scrambleData.sequence, scrambleData.puzzleType)

  form.reset()
}
</script>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  {#if timerSettings.timerMode === 'timer'}
    {#if timerState.inspection === InspectionState.NONE}
      <p
        class:text-text={timerState.timer === TimerState.IDLE || timerState.timer === TimerState.RUNNING}
        class:text-error={timerState.timer === TimerState.PREPARING}
        class:text-main={timerState.timer === TimerState.PREPARED}
        class="text-6xl font-bold transition-all duration-300 ease-in-out font-mono"
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
          <CTButton onclick={cancelInspection} color="primary">
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
        @apply outline-none bg-transparent text-6xl text-center font-bold;
    }
</style>

