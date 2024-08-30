import {derived, writable} from "svelte/store";
import type {Solve} from "$lib/types/solve.type";
import {scrambleData} from "$lib/store";

export const visible = writable<boolean>(false)

const selectedDetail = writable<Solve | null>(null)
export const detailData = derived([scrambleData, selectedDetail], ([$scrambleData, $selectedData]) => {
    if ($scrambleData && $scrambleData.length > 0) {
        let match = $scrambleData.findIndex(item => item.date === $selectedData?.date);

        return $scrambleData[match];
    }
    return null;
})

export function showDetail(data: Solve) {
    selectedDetail.set(data)

    visible.set(true)
}

export function hideDetail() {
    visible.set(false)

    selectedDetail.set(null)
}
