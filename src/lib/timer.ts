import {get, writable} from "svelte/store";
import {saveData} from "$lib/database";
import {puzzleType, sequence} from "$lib/store";

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

const prepareTime = 1000;

let startTime: number;
let interval: number | undefined;
let prepareTimeout: number | undefined;

export const time = writable<Time>({
    total: 0,
    seconds: 0,
    milliseconds: 0
})
export const state = writable<TimerState>(TimerState.IDLE)

export function toggleStart(e: KeyboardEvent) {
    let currentState = get(state)

    if (e.code === 'Space' && currentState === TimerState.PREPARED) {
        startTimer()
    }
    else if (e.code === 'Space' && currentState === TimerState.PREPARING) {
        clearTimeout(prepareTimeout)
        state.set(TimerState.IDLE)
    }
}

export function togglePrepare(e: KeyboardEvent) {
    let currentState = get(state)

    if (e.code === 'Space' && currentState === TimerState.IDLE) {
        prepareTimer()
    }
    else if (e.code === 'Space' && currentState === TimerState.RUNNING) {
        stopTimer()
    }
}

function prepareTimer() {
    state.set(TimerState.PREPARING)

    time.set({
        total: 0,
        seconds: 0,
        milliseconds: 0
    })

    prepareTimeout = setTimeout(() => {
        state.set(TimerState.PREPARED)
    }, prepareTime)
}

function startTimer() {
    state.set(TimerState.RUNNING)
    startTime = new Date().getTime()

    interval = setInterval(() => {
        updateTime()
    }, 10)
}

function stopTimer() {
    saveData(get(time).total, get(sequence), get(puzzleType))

    clearInterval(interval)
    state.set(TimerState.IDLE)
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
