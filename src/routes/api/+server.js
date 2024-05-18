import {scramble} from "cube-scramble.js";

export function GET({url}) {
    let type = url.searchParams.get("type");

    if (!type) type = "3x3"

    let sequence;

    try {
        sequence = scramble(type)
    }
    catch(e) {
        console.log(e)
    }

    if(!sequence) {
        return new Response('Invalid or non existent puzzle type!', {
            status: 400
        })
    }

    return new Response(sequence.join(' '), {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
}