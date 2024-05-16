const moves = ["U", "D", "L", "R", "B", "F"]
const dir = ["", "'", "2"]

export function generateScramble(cubeType) {
    let scrambleLength;

    switch (cubeType) {
        case "3x3":
            scrambleLength = 20;
            break;
        case "2x2":
            scrambleLength = 9;
            break;
    }

    if (!scrambleLength) return;

    let scramble = valid(Array.from({length: scrambleLength}, () => [random(moves), random(dir)]))

    return scramble.map(move => move.join('')).join(' ');
}

function valid(arr) {
    for (let x = 1; x < arr.length; x++) {
        while (arr[x][0] === arr[x - 1][0]) {
            arr[x][0] = random(moves);
        }
    }
    for (let x = 2; x < arr.length; x++) {
        while (arr[x][0] === arr[x - 2][0] || arr[x][0] === arr[x - 1][0]) {
            arr[x][0] = random(moves);
        }
    }
    return arr;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
