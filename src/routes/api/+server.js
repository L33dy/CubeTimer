import {generateScramble} from "$lib/apiFunc.js";

export function GET({url}) {
    let scrambleLength = url.searchParams.get("length");

    if (scrambleLength > 30 && scrambleLength) scrambleLength = 30;
    else if (scrambleLength < 5 && scrambleLength) scrambleLength = 5;

    return new Response(generateScramble(scrambleLength ? scrambleLength : 10), {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
}