export enum Penalty {
    None,
    PlusTwo,
    DNF
}

export interface Solve {
    date: number
    scramble: string
    time: number
    puzzleType: '3x3' | '2x2' | '4x4' | '5x5' | '6x6' | '7x7' | 'pyraminx' | 'megaminx' | 'skewb' | 'clock'
    note?: string
    penalty: Penalty
}
