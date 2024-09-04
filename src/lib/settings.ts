import type {Settings} from "$lib/types/settings.type";
import {settingsData} from "$lib/store";

const databaseName = 'ct_settings'

export function getSettings(): Settings {
    let data = localStorage.getItem(databaseName)

    if (!data) {
        data = loadDefaultSettings()

        updateSettings(JSON.parse(data))
    }

    return JSON.parse(data)
}

export function updateSettingValue(setting: string, key: any, value: any): void {
    let data = getSettings()

    data[setting][key] = value

    updateSettings(data)
}

function loadDefaultSettings(): string {
    const defaultSettings: Settings = {
        timerSettings: {
            useInspection: true,
            inspectionCounts: false,
            holdTime: 350
        }
    }


    return JSON.stringify(defaultSettings);
}

function updateSettings(data: Settings): void {
    settingsData.set(data)

    localStorage.setItem(databaseName, JSON.stringify(data))
}

