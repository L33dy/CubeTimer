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
