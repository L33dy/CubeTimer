import {type Writable, writable} from "svelte/store";
import type {Solve} from "$lib/types/solve.type";

export const cubeType: Writable<string> = writable('3x3')
export const scrambleData: Writable<Solve[] | null> = writable(null)
