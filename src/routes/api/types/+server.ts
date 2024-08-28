import { scrambleList } from 'cube-scramble.js'

export function GET() {
    const scrambleTypes: string[] = scrambleList;

    return new Response(JSON.stringify(scrambleTypes), {
        status: 200,
        headers: {
            'content-type': 'application/json',
        }
    })
}
