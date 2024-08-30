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

export function clearData(): void {
    localStorage.removeItem(databaseName)

    scrambleData.set(getData())
}

export function editPenalty(solves: Solve[], penalty: Penalty): void {
    const data = getData() ?? []

    solves.forEach(s => {
        const found = data.find(i => s.scramble === s.scramble);
        if (found) found.penalty = penalty
    })

    setData(data)
}

export function deleteSolves(solves: Solve[]): void {
    const data = getData() ?? []

    const filteredData = data.filter(item => !solves.some(solve => solve.scramble === item.scramble))

    setData(filteredData)
}

function setData(data: Solve[]): void {
    scrambleData.set(data);

    localStorage.setItem(databaseName, JSON.stringify(data))
}
