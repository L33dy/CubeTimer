export interface ConfirmModal {
    type: 'confirm'
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
}
