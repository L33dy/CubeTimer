import {scrambleData} from "$lib/store";
import {Penalty, type Solve} from "$lib/types/solve.type";
import toast from "svelte-french-toast";

const databaseName: string = 'ct_solves'

export function saveData(time: number, scramble: string, puzzleType: string): void {
    let data = getData() ?? []

    data.push(<Solve>{date: Date.now(), scramble: scramble, time: time, puzzleType: puzzleType, note: "", penalty: Penalty.NONE})

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

    if(Array.isArray(solve)) {
        data.forEach(item => {
            const match = solve.find(s => s.date === item.date)

            if (match) item.penalty = penalty
        })
    }
    else {
        const match = data.find(item => item.date === solve.date)

        if (match) match.penalty = penalty
    }

    setData(data)
}

export function addNote(solve: Solve, text: string): void {
    const data = getData() ?? []

    const updated = data.map(item => {
        if (item.date === solve.date) {
            return {
                ...item,
                note: text
            }
        }

        return item
    })

    setData(updated)
}

export function deleteSolves(solves: Solve[]): void {
    const data = getData() ?? []

    const updatedData = data.filter(item => !solves.some(solve => solve.date === item.date))

    setData(updatedData)

    toast.success('Solves deleted successfully.')
}

export function deleteSolve(solve: Solve): void {
    const data = getData() ?? []

    const updatedData = data.filter(item => item.date !== solve.date)

    setData(updatedData)

    toast.success('Solve deleted successfully.')
}

function setData(data: Solve[]): void {
    scrambleData.set(data);

    localStorage.setItem(databaseName, JSON.stringify(data))
}
