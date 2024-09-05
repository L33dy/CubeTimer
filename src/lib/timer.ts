import {get, writable} from "svelte/store";
import {saveData} from "$lib/database";
import {puzzleType, sequence, settingsData} from "$lib/store";
import {InspectionState, TimerState, type Time} from "$lib/types/timer.type";

let startTime: number;
let interval: number | undefined;
let inspectionInterval: number | undefined;
let prepareTimeout: number | undefined;

export const time = writable<Time>({
    total: 0,
    seconds: 0,
    milliseconds: 0
})
export const inspectionTime = writable<number>()
export const timerState = writable<TimerState>(TimerState.IDLE)
export const inspectionState = writable<InspectionState>(InspectionState.NONE)

let prepareTime: number;
let timerUpdate: number;
let useInspection: boolean;
let inspectionCountsDown: boolean

settingsData.subscribe(value => {
    prepareTime = value?.timerSettings.holdTime
    useInspection = value?.timerSettings.useInspection
    inspectionCountsDown = value?.timerSettings.inspectionCountsDown

    switch(value?.timerSettings.timerUpdate) {
        case 0:
         timerUpdate = 1000
            break
        case 1:
            timerUpdate = 100
            break
        case 2:
            timerUpdate = 10
            break
        case 3:
            timerUpdate = 1
            break
    }
})

export function toggleStart(e: KeyboardEvent) {
    let currentState = get(timerState)

    if (e.code === 'Space' && currentState === TimerState.PREPARED) {
        startTimer()
    }
    else if (e.code === 'Space' && currentState === TimerState.PREPARING) {
        clearTimeout(prepareTimeout)
        timerState.set(TimerState.IDLE)
    }
}

export function togglePrepare(e: KeyboardEvent) {
    let currentState = get(timerState)
    let currentInspection = get(inspectionState)

    if (e.code === 'Space') {
        if (useInspection && currentInspection === InspectionState.NONE && currentState === TimerState.IDLE) {
            startInspection()
        }

        if ((!useInspection && currentState === TimerState.IDLE) || useInspection && currentInspection === InspectionState.RUNNING) {
            prepareTimer()
        }

        if (currentState === TimerState.RUNNING) {
            stopTimer()
        }
    }
}

function startInspection() {
    inspectionState.set(InspectionState.RUNNING)

    let count = inspectionCountsDown ? 15 : 0
    inspectionTime.set(count)

    inspectionInterval = setInterval(() => {
        if (inspectionCountsDown) {
            count--

            if (count < 0) {
                clearInterval(inspectionInterval)
                inspectionState.set(InspectionState.NONE)
            }
        }
        else {
            count++

            if (count > 15) {
                clearInterval(inspectionInterval)
                inspectionState.set(InspectionState.NONE)
            }
        }

        inspectionTime.update(() => {
            return count
        })
    }, 1000)

}

export function cancelInspection() {
    clearInterval(inspectionInterval)

    inspectionState.set(InspectionState.NONE)
}

function prepareTimer() {
    cancelInspection()
    timerState.set(TimerState.PREPARING)

    time.set({
        total: 0,
        seconds: 0,
        milliseconds: 0
    })

    prepareTimeout = setTimeout(() => {
        timerState.set(TimerState.PREPARED)
    }, prepareTime)
}

function startTimer() {
    timerState.set(TimerState.RUNNING)
    startTime = new Date().getTime()

    interval = setInterval(() => {
        updateTime()
    }, timerUpdate)
}

function stopTimer() {
    saveData(get(time).total, get(sequence), get(puzzleType))

    clearInterval(interval)
    timerState.set(TimerState.IDLE)
}

function updateTime() {
    let currentTime = new Date().getTime()
    let elapsedTime = currentTime - startTime
    let seconds = Math.floor(elapsedTime / 1000) % 60
    let milliseconds = elapsedTime % 1000

    time.update(() => {
        return {
            total: elapsedTime / 1000,
            seconds: seconds,
            milliseconds: milliseconds
        }
    })
}
