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
  scrambles: Solve[],
  sequence: string,
  puzzleType: PuzzleType,
}>({
  scrambles: [],
  sequence: '',
  puzzleType: '3x3',
})
