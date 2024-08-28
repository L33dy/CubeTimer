import {scrambleData} from "$lib/store";
import {Penalty, type SolveData} from "$lib/types/solve.type";

const databaseName: string = 'solves'

export function saveData(time: number, scramble: string): void {
    let data = getData()

    if (data) {
        data['data'].push({scramble: scramble, time: time, penalty: Penalty.None})
    }
    else {
        data = {
            data: [
                {
                    scramble: scramble,
                    time: time,
                    penalty: Penalty.None
                }
            ]
        }
    }

    setData(data)
}

export function getData(): SolveData | null{
    let data = localStorage.getItem(databaseName)

    return data ? JSON.parse(data) : undefined;
}

function setData(data: SolveData): void {
    scrambleData.set(data);

    localStorage.setItem(databaseName, JSON.stringify(data))
}
