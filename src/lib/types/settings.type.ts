export interface Settings {
    [key: string]: any
}

export interface TimerSettings {
    useInspection: boolean
    inspectionCountsDown: boolean
    showCancelInspection: boolean
    holdTime: number
    timerUpdate: number
}
