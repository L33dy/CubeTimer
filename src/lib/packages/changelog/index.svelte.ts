import changelogData from '$lib/json/changelog.json'

export interface Changelog {
  version: string
  date: string
  description?: string
  add?: string[]
  update?: string[]
  fix?: string[]
}

export const changelog = $state<{
  visible: boolean
  data: Changelog[]
}>({
  visible: false,
  data: changelogData as Changelog[],
})

export function openChangelog() {
  changelog.visible = true
}

export function closeChangelog() {
  changelog.visible = false
}
