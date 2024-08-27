export enum Penalty {
    None,
    PlusTwo,
    DNF
}

export type Solve = {
    data: [
        {
            scramble: string,
            time: number,
            penalty: Penalty
        }
    ]
}
