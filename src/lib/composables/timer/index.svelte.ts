import { saveData, scrambleData, settings } from '$lib/composables'

export enum InspectionState {
  NONE,
  RUNNING
}

export enum TimerState {
  IDLE,
  PREPARING,
  PREPARED,
  RUNNING
}

export interface Time {
  total: number
  seconds: number
  milliseconds: number
}

let startTime: number
let interval = $state<ReturnType<typeof setInterval>>()
let inspectionInterval = $state<ReturnType<typeof setInterval>>()
let prepareInterval = $state<ReturnType<typeof setInterval>>()

export const time = $state<{
  value: Time
}>({
  value: {
    total: 0,
    seconds: 0,
    milliseconds: 0,
  },
})

export const inspectionTime = $state<{
  value: number
}>({
  value: 0,
})

export const timerState = $state<{
  timer: TimerState,
  inspection: InspectionState,
}>({
  timer: TimerState.IDLE,
  inspection: InspectionState.NONE,
})

const prepareTime = $derived(settings.value.timerSettings.holdTime)
const useInspection = $derived(settings.value.timerSettings.useInspection)
const inspectionCountsDown = $derived(settings.value.timerSettings.inspectionCountsDown)

const timerUpdate = $derived.by(() => {
  switch(settings.value.timerSettings.timerUpdate) {
    case 0:
      return 1000
    case 1:
      return 100
    case 2:
      return 10
    case 3:
      return 1
  }
})

export function toggleStart(e: KeyboardEvent) {
  if (e.code === 'Space' && timerState.timer === TimerState.PREPARED) {
    startTimer()
  }
  else if (e.code === 'Space' && timerState.timer === TimerState.PREPARING) {
    clearTimeout(prepareInterval)
    timerState.timer = TimerState.IDLE
  }
}

export function togglePrepare(e: KeyboardEvent) {
  if (settings.value.timerSettings.timerMode === 'typing') return

  if (e.code === 'Space') {
    if (useInspection && timerState.inspection === InspectionState.NONE && timerState.timer === TimerState.IDLE) {
      startInspection()
    }
    else if ((!useInspection && timerState.timer === TimerState.IDLE) || useInspection && timerState.inspection === InspectionState.RUNNING) {
      prepareTimer()
    }

    if (timerState.timer === TimerState.RUNNING) {
      stopTimer()
    }
  }
}

function startInspection() {
  timerState.inspection = InspectionState.RUNNING

  let count = inspectionCountsDown ? 15 : 0
  inspectionTime.value = count

  inspectionInterval = setInterval(() => {
    if (inspectionCountsDown) {
      count--

      if (count < 0) {
        clearInterval(inspectionInterval)
        timerState.inspection = InspectionState.NONE
      }
    }
    else {
      count++

      if (count > 15) {
        clearInterval(inspectionInterval)
        timerState.inspection = InspectionState.NONE
      }
    }

    inspectionTime.value = count
  }, 1000)

}

export function cancelInspection() {
  clearInterval(inspectionInterval)

  timerState.inspection = InspectionState.NONE
}

function prepareTimer() {
  cancelInspection()
  timerState.timer = TimerState.PREPARING

  time.value = {
    total: 0,
    seconds: 0,
    milliseconds: 0,
  }

  prepareInterval = setTimeout(() => {
    timerState.timer = TimerState.PREPARED
  }, prepareTime)
}

function startTimer() {
  timerState.timer = TimerState.RUNNING
  startTime = new Date().getTime()

  interval = setInterval(() => {
    updateTime()
  }, timerUpdate)
}

function stopTimer() {
  saveData(time.value.total, scrambleData.sequence, scrambleData.puzzleType)

  clearInterval(interval)
  timerState.timer = TimerState.IDLE
}

function updateTime() {
  const currentTime = new Date().getTime()
  const elapsedTime = currentTime - startTime
  const seconds = Math.floor(elapsedTime / 1000) % 60
  const milliseconds = elapsedTime % 1000

  time.value = {
    total: elapsedTime / 1000,
    seconds,
    milliseconds,
  }
}
