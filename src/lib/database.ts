import {scrambleData} from "$lib/store";
import {Penalty, type Solve} from "$lib/types/solve.type";

const databaseName: string = 'solves'

export function saveData(time: number, scramble: string): void {
    let data = getData() ?? []

    data.push({scramble: scramble, time: time, penalty: Penalty.None})

    setData(data)
}

export function getData(): Solve[] | null{
    let data = localStorage.getItem(databaseName)

    return data ? JSON.parse(data) : undefined;
}

function setData(data: Solve[]): void {
    scrambleData.set(data);

    localStorage.setItem(databaseName, JSON.stringify(data))
}
