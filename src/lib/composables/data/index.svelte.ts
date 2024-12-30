/**
 * Penalty for an individual solve.
 */
export enum Penalty {
  NONE,
  PLUSTWO,
  DNF
}

/**
 * Available puzzle type.
 */
export type PuzzleType = '3x3' | '2x2' | '4x4' | '5x5' | '6x6' | '7x7' | 'pyraminx' | 'megaminx' | 'skewb' | 'clock'

export interface Solve {
  date: number
  scramble: string
  time: number
  puzzleType: PuzzleType
  note: string
  penalty: Penalty
}

export const scrambleData = $state<{
  scrambles: Solve[] | null,
  sequence: string,
  puzzleType: PuzzleType,
}>({
  scrambles: null,
  sequence: '',
  puzzleType: '3x3',
})

export function getValidSolves(): Solve[] {
  return scrambleData.scrambles?.filter(scramble => scramble.penalty !== Penalty.DNF) ?? []
}

export function getTimes(): number[] {
  return scrambleData.scrambles?.filter(scramble => scramble.penalty !== Penalty.DNF)
    .map(scramble => {
      let time = scramble.time

      if (scramble.penalty === Penalty.PLUSTWO) time += 2

      return time
    }) ?? []
}
