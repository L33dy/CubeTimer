import {scrambleData} from "$lib/store";
import {Penalty, type Solve} from "$lib/types/solve.type";

const databaseName = 'solves'

export function saveData(time: number, scramble: string): void {
    let cachedData = getData()

    if (cachedData) {
        cachedData['data'].push({scramble: scramble, time: time, penalty: Penalty.None})
    }
    else {
        cachedData = {
            data: [
                {
                    scramble: scramble,
                    time: time,
                    penalty: Penalty.None
                }
            ]
        }
    }

    setCached(cachedData)
}

export function getData(): Solve | null{
    let data = localStorage.getItem(databaseName)

    return data ? JSON.parse(data) : undefined;
}

/*export function deleteFromDatabase(times) {
    let cachedData = getData()

    cachedData.data = cachedData.data.filter(record => !times.includes(record.time))

    setCached(cachedData)

    if (cachedData.data.length <= 0) {
        localStorage.removeItem(databaseName)
    }
}*/

/*export function editPenaltyOnDatabase(times, penalty) {
    let cachedData = getData()

    times.forEach(time => {
        cachedData.data.find(item => item.time === time).penalty = penalty;
    })

    setCached(cachedData)
}*/

function setCached(cachedData: Solve): void {
    scrambleData.set(cachedData);

    localStorage.setItem(databaseName, JSON.stringify(cachedData))
}
