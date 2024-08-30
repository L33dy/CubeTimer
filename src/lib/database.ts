import {scrambleData} from "$lib/store";
import {Penalty, type Solve} from "$lib/types/solve.type";

const databaseName: string = 'solves'

export function saveData(time: number, scramble: string, puzzleType: string): void {
    let data = getData() ?? []

    data.push(<Solve>{date: Date.now(), scramble: scramble, time: time, puzzleType: puzzleType, penalty: Penalty.None})

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

export function editPenalty(solve: Solve[] | Solve, penalty: Penalty): void {
    const data = getData() ?? []

    if (Array.isArray(solve)) {
        solve.forEach(s => {
            const found = data.find(i => s.scramble === s.scramble);
            if (found) found.penalty = penalty
        })
    }
    else {
        data.find(i => i.date === solve.date)!.penalty = penalty;
    }

    setData(data)
}

export function addNote(solve: Solve, text: string): void {
    const data = getData() ?? []

    data.find(i => i.date === solve.date)!.note = text;

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
