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
    let times;
    let sum;

    data.subscribe(d => {
        if(!d) return;

        times = d.data
            .filter(item => item.penalty !== 2)
            .map(item => {
            let time = parseFloat(item.time);

            if (item.penalty === 1) {
                time += 2;
            }

            return time;
        })
        sum = times.reduce((total, time) => total + time, 0)
    })

    if (!times || !sum) return;

    return (sum / times.length).toFixed(2)
}

export function getAverage(num) {
    let remaining;
    let sum;

    data.subscribe(d => {
        if(!d) return;

        let times = d.data
            .map(item => {
            let time = parseFloat(item.time);

            if (item.penalty === 1) {
                time += 2;
            }

            return time;
        })

        if (times.length < num) return;

        let last = times.slice(-num)

        let fastest = last.indexOf(Math.min(...last))
        let slowest = last.indexOf(Math.max(...last))

        remaining = last.filter((_, index) => index !== fastest && index !== slowest)

        sum = remaining.reduce((acc, time) => acc + time, 0)
    })

    if (!remaining || !sum) return;

    return (sum / remaining.length).toFixed(2)
}

export function deleteFromDatabase(times) {
    let cachedData = getCached()

    cachedData.data = cachedData.data.filter(record => !times.includes(record.time))

    setCached(cachedData)

    if (cachedData.data.length <= 0) {
        localStorage.removeItem(databaseName)
    }
}

export function editPenaltyOnDatabase(times, penalty) {
    let cachedData = getCached()

    times.forEach(time => {
        cachedData.data.find(item => item.time === time).penalty = penalty;
    })

    setCached(cachedData)
}

function setCached(cachedData) {
    data.update(d => d = cachedData)

    localStorage.setItem(databaseName, JSON.stringify(cachedData))
}

function getCached() {
    return JSON.parse(localStorage.getItem(databaseName));
}