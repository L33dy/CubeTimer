export interface ChangelogModal {
  type: 'changelog'
  onCancel?: () => void | Promise<void>
}
