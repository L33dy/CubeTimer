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

    console.log(cachedData)

    if (cachedData) {
        let times = cachedData.data.map(item => parseFloat(item.time))
        let sum = times.reduce((total, time) => total + time, 0)

        return (sum / times.length).toFixed(2);
    }
}

function getCached() {
    return localStorage.getItem('cachedScrambles')
}