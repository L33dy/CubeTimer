import {scrambleData} from "$lib/store";
import {Penalty} from "$lib/types/solve.type";

export function getMeanTime(): number | undefined {
    let times: number[] | undefined;
    let sum: number | undefined;

    scrambleData.subscribe(d => {
        if(!d) return;

        times = d.data
            .filter(item => item.penalty !== Penalty.DNF)
            .map(item => {
                let time = item.time;

                if (item.penalty === 1) {
                    time += 2;
                }

                return time;
            })
        sum = times.reduce((total, time) => total + time, 0)
    })

    if (!times || !sum) return;

    return parseFloat((sum / times.length).toFixed(2))
}

export function getAverage(num: number): number | undefined {
    let remaining: number[] | undefined;
    let sum: number | undefined;

    scrambleData.subscribe(d => {
        if(!d) return;

        let times = d.data
            .map(item => {
                let time = item.time;

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

    return parseFloat((sum / remaining.length).toFixed(2))
}
