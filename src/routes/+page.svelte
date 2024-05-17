<script>
    import Status from "./components/Status.svelte";
    import {fade} from "svelte/transition";
    import {generateScramble} from "$lib/scramble.js";
    import {saveTime, getMeanTime, getAverage} from "$lib/save.js";
    import {cubeType} from "$lib/store.js";
    import {onMount} from "svelte";
    import SessionStats from "./components/SessionStats.svelte";

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

    function getStats() {
        meanTime = getMeanTime()
        ao5 = getAverage(5)
        ao12 = getAverage(12)
        ao100 = getAverage(100)
    }

    onMount(() => {
        getStats()
    })

    $: cubeType.subscribe(type => {
        scramble = generateScramble(type)
    })
</script>

<svelte:body on:keyup={toggleTimer} />

<SessionStats />

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-1/2 relative">
    {#key scramble}
        <p in:fade={{duration: 450}} class:opacity-0={interval} class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default">{scramble ? scramble : ""}</p>
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

<!--
<div class="absolute bottom-10 left-10 bg-white rounded-lg p-2">
    <a href="/settings" class="hover:child:rotate-180">
        <img src="../../icons/settings.svg" alt="settings" class="w-8 transition-all duration-500 ease-in-out">
    </a>
</div>-->
