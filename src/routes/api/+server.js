import {generateScramble} from "$lib/scramble.js";

export function GET({url}) {
    let cubeType = url.searchParams.get("type");

    let scramble = generateScramble(cubeType? cubeType : "3x3");

    if (!scramble) {
        return new Response("Invalid or non-existent cube type!", {
            status: 400
        })
    }

    return new Response(scramble, {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
}