import {type Writable, writable} from "svelte/store";
import type {Solve} from "$lib/types/solve.type";

export const puzzleType: Writable<string> = writable('3x3')
export const sequence: Writable<string> = writable('')
export const scrambleData: Writable<Solve[] | null> = writable(null)
