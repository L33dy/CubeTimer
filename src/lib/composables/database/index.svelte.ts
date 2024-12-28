import toast from 'svelte-french-toast'
import { scrambleData, Penalty, type PuzzleType, type Solve } from '$lib/composables'

const databaseName: string = 'ct_solves'

export function saveData(time: number, scramble: string, puzzleType: PuzzleType): void {
  const data = getData() ?? []

  data.push(<Solve>{ date: Date.now(), scramble: scramble, time: time, puzzleType: puzzleType, note: '', penalty: Penalty.NONE })

  setData(data)
}

export function getData(): Solve[] {
  const data = localStorage.getItem(databaseName)

  return data ? JSON.parse(data) : []
}

export function clearData(): void {
  localStorage.removeItem(databaseName)

  scrambleData.scrambles = getData()

  toast.success('Session cleared!')
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
        note: text,
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
  scrambleData.scrambles = data

  localStorage.setItem(databaseName, JSON.stringify(data))
}
