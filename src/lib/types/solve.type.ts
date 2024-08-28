export enum Penalty {
    None,
    PlusTwo,
    DNF
}

export type SolveData = {
    data: [
        {
            scramble: string,
            time: number,
            penalty: Penalty
        }
    ]
}

export type Solve = {
    scramble: string,
    time: number,
    penalty: Penalty
}
