import {data} from "$lib/store.js";

const databaseName = 'sessions'

export function saveTime(time, scramble) {
    let cachedData = getCached()

    if (cachedData) {
        cachedData['data'].push({scramble: scramble, time: time, penalty: 0})
    }
    else {
        cachedData = {
            data: [
                {
                    scramble: scramble,
                    time: time,
                    penalty: 0
                }
            ]
        }
    }

    setCached(cachedData)
}

export function getMeanTime() {
    let cachedData = getCached()

    if (cachedData) {
        let times = cachedData.data.map(item => parseFloat(item.time))
        let sum = times.reduce((total, time) => total + time, 0)

        return (sum / times.length).toFixed(2);
    }
}

export function getAverage(num) {
    let cachedData = getCached()

    if (cachedData) {
        let times = cachedData.data.map(item => parseFloat(item.time))

        if (times.length < num) return;

        let last = times.slice(-num)

        let fastest = last.indexOf(Math.min(...last))
        let slowest = last.indexOf(Math.max(...last))

        let remaining = last.filter((_, index) => index !== fastest && index !== slowest)

        let sum = remaining.reduce((acc, time) => acc + time, 0)

        return (sum / remaining.length).toFixed(2)
    }
}

export function deleteFromDatabase(times) {
    let cachedData = getCached()

    cachedData.data = cachedData.data.filter(record => !times.includes(record.time))

    setCached(cachedData)
}

function setCached(cachedData) {
    data.update(d => d = cachedData)

    localStorage.setItem(databaseName, JSON.stringify(cachedData))
}

function getCached() {
    let cached = JSON.parse(localStorage.getItem(databaseName))

    data.subscribe(d => {
        if (!d) {
            data.set(cached)
        }
    })

    return cached;
}