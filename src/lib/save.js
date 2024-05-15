export function saveTime(time, scramble) {
    let cachedData = JSON.parse(getCached())

    if (cachedData) {
        cachedData['data'].push({scramble: scramble, time: time})
    }
    else {
        cachedData = {
            data: [
                {
                    scramble: scramble,
                    time: time
                }
            ]
        }
    }

    localStorage.setItem('cachedScrambles', JSON.stringify(cachedData))
}

export function getMeanTime() {
    let cachedData = JSON.parse(getCached())

    if (cachedData) {
        let times = cachedData.data.map(item => parseFloat(item.time))
        let sum = times.reduce((total, time) => total + time, 0)

        return (sum / times.length).toFixed(2);
    }
}

export function getAverage(num) {
    let cachedData = JSON.parse(getCached())

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

function getCached() {
    return localStorage.getItem('cachedScrambles')
}