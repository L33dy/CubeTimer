import toast from 'svelte-french-toast'

export interface Settings {
  timerSettings: TimerSettings
  appearanceSettings: AppearanceSettings
}

export interface TimerSettings {
  useInspection: boolean
  inspectionCountsDown: boolean
  showCancelInspection: boolean
  holdTime: number
  timerMode: 'timer' | 'typing'
  timerUpdate: 0 | 1 | 2 | 3
}

export interface AppearanceSettings {
  theme: string
}

export interface Theme {
  name: string
  background: string
  backgroundAlt: string
  text: string
  textAlt: string
  main: string
  error: string
}

const defaultSettings: Settings = {
  timerSettings: {
    useInspection: false,
    inspectionCountsDown: false,
    showCancelInspection: true,
    holdTime: 350,
    timerMode: 'timer',
    timerUpdate: 3,
  },
  appearanceSettings: {
    theme: 'blue-night',
  },
}

export const settings = $state<{
  value: Settings,
}>({
  value: defaultSettings,
})

const databaseName = 'ct_settings'


export function getSettings(): Settings {
  let data = localStorage.getItem(databaseName)

  if (!data) {
    data = loadDefaultSettings()

    updateSettings(JSON.parse(data))
  }

  return JSON.parse(data)
}

export function updateSettingValue<T extends keyof Settings, K extends keyof Settings[T]>(setting: T, key: K, value: Settings[T][K]): void {
  const data = getSettings()

  data[setting][key] = value

  updateSettings(data)
}

export function resetSettings(): void {
  localStorage.removeItem(databaseName)
  getSettings()

  toast.success('Settings have been reset.')
}

export function loadTheme(name: string): void {
  const existingLink = document.getElementById('theme') as HTMLLinkElement

  if (existingLink) {
    existingLink.href = `/themes/${name}.css`
  }
  else {
    const link = document.createElement('link')
    link.id = 'theme'
    link.href = `/themes/${name}.css`
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.media = 'screen,print'

    document.getElementsByTagName('head')[0].appendChild(link)
  }

  updateSettingValue('appearanceSettings', 'theme', name)
}

function loadDefaultSettings(): string {
  return JSON.stringify(defaultSettings)
}

function updateSettings(data: Settings): void {
  settings.value = data

  localStorage.setItem(databaseName, JSON.stringify(data))
}

