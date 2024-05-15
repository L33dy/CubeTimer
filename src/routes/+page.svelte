<script>
    import Status from "./components/Status.svelte";
    import {fade} from "svelte/transition";
    import {generateScramble} from "$lib/scramble.js";
    import {saveTime, getMeanTime, getAverage} from "$lib/save.js";
    import {getSettings} from "$lib/settings.js";
    import {onMount} from "svelte";

    let settings;

    let meanTime;
    let ao5;
    let ao12;
    let ao100;

    let scramble;
    let timer;
    let timerText;

    let startTime;
    let interval;

    async function toggleTimer(e) {
        if(e.code !== "Space" || e.keyCode !== 32) return;

        if (!interval) {
            startTime = new Date().getTime();
            interval = setInterval(updateTime, 10)
        }
        else {
            clearInterval(interval)
            interval = null;

            saveTime(timerText, await scramble)

            getStats()

            scramble = generateScramble(settings.scrambleSize)
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

    function getStats() {
        meanTime = getMeanTime()
        ao5 = getAverage(5)
        ao12 = getAverage(12)
        ao100 = getAverage(100)
    }

    onMount(() => {
        settings = getSettings()

        scramble = generateScramble(settings.scrambleSize)

        getStats()
    })
</script>

<svelte:body on:keyup={toggleTimer} />

<div class="absolute top-5 right-5 bg-white rounded-lg p-1.5">
    <a href="/settings" class="hover:child:rotate-180">
        <img src="../../icons/settings.svg" alt="settings" class="w-9 transition-all duration-500 ease-in-out">
    </a>
</div>

<div class="flex justify-center items-center mt-40 w-full relative">
    {#key scramble}
        <p in:fade={{duration: 450}} class:opacity-0={interval} class="text-4xl font-medium whitespace-nowrap absolute bottom-0 left-1/2 -translate-x-1/2 transition-opacity duration-150">{scramble ? scramble : ""}</p>
    {/key}
</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <p bind:this={timer} class:scale-150={interval} class="text-6xl font-bold transition-all duration-300 ease-in-out">0.000</p>
</div>

<div class="w-[250px] h-[150px] absolute bottom-10 right-10 flex justify-between items-center flex-wrap bg-white py-1 px-3 rounded-lg">
   <Status name="AO5" value={ao5} />
   <Status name="AO12" value={ao12} />
   <Status name="AO100" value={ao100} />
   <Status name="MEAN" value={meanTime} />
</div>