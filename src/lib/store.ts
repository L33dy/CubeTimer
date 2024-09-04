import {writable} from "svelte/store";
import type {Solve} from "$lib/types/solve.type";
import type {Settings} from "$lib/types/settings.type";

export const puzzleType = writable<string>('3x3')
export const sequence = writable<string>('')
export const scrambleData = writable<Solve[] | null>(null)
export const settingsData = writable<Settings | null>(null)
