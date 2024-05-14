export async function getScramble() {
    const res = await fetch('/api', {
        method: 'GET'
    })

    return await res.text()
}