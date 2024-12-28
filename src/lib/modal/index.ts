import { writable } from 'svelte/store'
import type { ConfirmModal } from '$lib/modal/types/confirm'

export type Modal = (ConfirmModal)

export const currentModal = writable<Modal | null>(null)

export function createModal(data: Modal) {
  currentModal.set(data)
}

export function closeCurrentModal() {
  currentModal.set(null)
}
