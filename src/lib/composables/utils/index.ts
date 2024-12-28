import { Penalty, scrambleData } from '$lib/composables'

export function getMeanTime(): number | undefined {
  const times = scrambleData.scrambles.filter(item => item.penalty !== Penalty.DNF)
    .map(item => {
      let time = item.time

      if (item.penalty === Penalty.PLUSTWO) {
        time += 2
      }

      return time
    })

  const sum = times.reduce((acc, time) => acc + time, 0)

  if (times.length === 0) return

  return parseFloat((sum / times.length).toFixed(2))
}

export function getAverage(num: number): number | undefined {
  const times = scrambleData.scrambles.filter(item => item.penalty !== Penalty.DNF)
    .map(item => {
      let time = item.time

      if (item.penalty === Penalty.PLUSTWO) {
        time += 2
      }

      return time
    })

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
