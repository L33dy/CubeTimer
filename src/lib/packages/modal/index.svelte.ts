import type { ConfirmModal, ThemeModal } from './types'

export type Modal = (ConfirmModal | ThemeModal)

export const currentModal = $state<{
  value?: Modal
}>({
  value: undefined,
})

export function createModal(data: Modal) {
  currentModal.value = data
}

export function closeCurrentModal() {
  currentModal.value = undefined
}
