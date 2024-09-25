import type {Settings} from "$lib/types/settings.type";
import {settingsData} from "$lib/store";
import toast from "svelte-french-toast";

const databaseName = 'ct_settings'

const defaultSettings: Settings = {
    timerSettings: {
        useInspection: false,
        inspectionCountsDown: false,
        showCancelInspection: true,
        holdTime: 350,
        timerMode: 'timer',
        timerUpdate: 3
    }
}


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

export function resetSettings(): void {
    localStorage.removeItem(databaseName)
    getSettings()

    toast.success('Settings have been reset.')
}

function loadDefaultSettings(): string {
    return JSON.stringify(defaultSettings);
}

function updateSettings(data: Settings): void {
    settingsData.set(data)

    localStorage.setItem(databaseName, JSON.stringify(data))
}

