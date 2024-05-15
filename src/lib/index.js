export async function getScramble(scrambleSize) {
    const res = await fetch('/api?length=' + scrambleSize, {
        method: 'GET'
    })

    return await res.text()
}