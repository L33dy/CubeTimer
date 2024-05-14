import {generateScramble} from "$lib/apiFunc.js";

export function GET({url}) {
    let scrambleLength = url.searchParams.get("length");

    return new Response(generateScramble(scrambleLength ? scrambleLength : 10), {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
}