export function getSettings() {
    let settings = JSON.parse(localStorage.getItem("settings"));

    if (settings) {
        return settings;
    }
    else {
        let defaultSettings = {
            "scrambleSize": 10
        }

        localStorage.setItem("settings", JSON.stringify(defaultSettings))

        return defaultSettings;
    }
}

export function setSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings))
}