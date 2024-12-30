import { getTimes, getValidSolves, type Solve } from '$lib/composables'

export interface TimeDistribution {
  start: number
  end: number
  count: number
}

export function getBestSingle(): Solve {
  const solves = getValidSolves()

  return solves.sort((a, b) => a.time - b.time)[0]
}

export function getMeanTime(): number | undefined {
  const times = getTimes()

  const sum = times.reduce((acc, time) => acc + time, 0)

  if (times.length === 0) return

  return parseFloat((sum / times.length).toFixed(2))
}

export function getAverage(num: number): number | undefined {
  const times = getTimes()

  if (times.length < num) return

  const last = times.slice(-num)

  const fastest = last.indexOf(Math.min(...last))
  const slowest = last.indexOf(Math.max(...last))

  const remaining = last.filter((_, index) => index !== fastest && index !== slowest)
  const sum = remaining.reduce((acc, time) => acc + time, 0)

  if (remaining.length === 0) return

  return parseFloat((sum / remaining.length).toFixed(2))
}

export function isValidTime(input: string): boolean {
  const num = Number(input)

  return !isNaN(num) && /^[0-9]+(\.[0-9]+)?$/.test(input)
}

export function getTimeDistribution(): TimeDistribution[] {
  const solves = getValidSolves()

  const minTime = Math.min(...solves.map(solve => solve.time))
  const maxTime = Math.max(...solves.map(solve => solve.time))

  const step = (maxTime - minTime) / 7

  const distribution: TimeDistribution[] = []

  for (let i = 0; i < 7; i++) {
    const rangeStart = minTime + i * step
    const rangeEnd = i === 7 - 1 ? maxTime : rangeStart + step

    const count = solves.filter(solve => solve.time >= rangeStart && solve.time <= rangeEnd).length

    distribution.push({
      start: rangeStart,
      end: rangeEnd,
      count,
    })
  }

  return distribution
}
