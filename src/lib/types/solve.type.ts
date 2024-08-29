export enum Penalty {
    None,
    PlusTwo,
    DNF
}

export interface Solve {
    scramble: string
    time: number
    penalty: Penalty
}
