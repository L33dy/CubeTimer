import { scrambleData, type Solve } from '$lib/composables'

let selectedDetail = $state<Solve>()

export function getDetailData() {
  return {
    get value() { return scrambleData.scrambles?.find(item => item.date === selectedDetail?.date) },
  }
}

export const detailData = getDetailData()

export function showDetail(data: Solve) {
  selectedDetail = data
}

export function hideDetail() {
  selectedDetail = undefined
}
