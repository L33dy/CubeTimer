<script>
    import {fade} from "svelte/transition";
    import {generateScramble} from "$lib/scramble.js";
    import {saveTime} from "$lib/save.js";
    import {cubeType} from "$lib/store.js";
    import Session from "./components/Session.svelte";
    import Stats from "./components/Stats.svelte";

    let scramble;
    let timer;
    let timerText;

    let startTime;
    let interval;

    function keyDown(e) {
        if (e.key === "Enter") {
            cubeType.subscribe(type => {
                scramble = generateScramble(type)
            })
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

            saveTime(timerText, scramble)

            cubeType.subscribe(type => scramble = generateScramble(type))
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

    $: cubeType.subscribe(type => {
        scramble = generateScramble(type)
    })
</script>

<svelte:body on:keydown={keyDown} on:keyup={toggleTimer}/>

<Session/>

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-1/2 relative">
    {#key scramble}
        <p in:fade={{duration: 450}} class:opacity-0={interval}
           class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default">{scramble ? scramble : ""}</p>
    {/key}
</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <p bind:this={timer} class="text-6xl font-bold transition-all duration-300 ease-in-out" class:scale-150={interval}>
        0.000</p>
</div>

<Stats/>

<!--
<div class="absolute bottom-10 left-10 bg-white rounded-lg p-2">
    <a href="/settings" class="hover:child:rotate-180">
        <img src="../../icons/settings.svg" alt="settings" class="w-8 transition-all duration-500 ease-in-out">
    </a>
</div>-->
