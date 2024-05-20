<script>
    import {fade} from "svelte/transition";
    import {scramble} from 'cube-scramble.js'
    import {saveTime} from "$lib/save.js";
    import {cubeType} from "$lib/store.js";
    import Session from "./components/Session.svelte";
    import Stats from "./components/Stats.svelte";

    let sequence;
    let timer;
    let timerText;

    let startTime;
    let interval;

    function keyDown(e) {
        if (e.key === "Enter") {
            generateNewSequence()
        }
    }

    function toggleTimer(e) {
        if (e.code !== "Space" || e.keyCode !== 32) return;

        if (!interval) {
            startTime = new Date().getTime();
            interval = setInterval(updateTime, 10)
        } else {
            clearInterval(interval)
            interval = null;

            saveTime(timerText, sequence)

            generateNewSequence()
        }
    }

    function updateTime() {
        let currentTime = new Date().getTime()
        let elapsedTime = currentTime - startTime;
        let seconds = Math.floor(elapsedTime / 1000) % 60
        let milliseconds = elapsedTime % 1000;

        timerText = `${seconds}.${milliseconds.toString().padStart(3, '0')}`

        timer.innerHTML = timerText;
    }

    function generateNewSequence() {
        cubeType.subscribe(type => {
            sequence = scramble(type).join(' ');
        })
    }

    $: generateNewSequence()
</script>

<svelte:body on:keydown={keyDown} on:keyup={toggleTimer}/>

<Session/>
<Stats/>

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-3/4 relative">
    {#key sequence}
        <p in:fade={{duration: 450}} class:opacity-0={interval}
           class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default">{sequence ? sequence : ""}</p>
    {/key}
</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <p bind:this={timer} class="text-6xl font-bold transition-all duration-300 ease-in-out" class:scale-150={interval}>
        0.000</p>
</div>