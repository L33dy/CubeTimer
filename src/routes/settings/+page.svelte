<script>
    import {getSettings, setSettings} from "$lib/settings.js";
    import {onMount} from "svelte";

    let settings;
    let scrambleSlider;

    $: if (settings) {
        updateSettings()
    }

    onMount(() => {
        settings = getSettings()

        scrambleSlider.value = settings?.scrambleSize;
    })

    function updateSettings() {
        setSettings(settings)
    }

    function changeScrambleSize() {
        settings.scrambleSize = parseInt(scrambleSlider.value)
    }
</script>

<div class="w-1/3 mx-auto pt-14">
    <div class="flex flex-col justify-center items-start bg-white w-full rounded-lg px-4 py-3">
        <h2 class="text-xl font-medium">General</h2>
        <div class="flex justify-between items-center mt-6 w-full">
            <div class="relative w-full flex justify-start items-center gap-3 text-lg">
                <label for="scramble-size">Scramble size:</label>
                <p class="text-violet-600 text-center font-medium" id="scramble-size">{settings?.scrambleSize ? settings?.scrambleSize : ""}</p>
            </div>
            <input bind:this={scrambleSlider} on:input={changeScrambleSize} id="scramble-slider"
                   type="range" min="5" max="30">
        </div>
    </div>
</div>

<style lang="postcss">
    /*********** Baseline, reset styles ***********/
    input[type="range"] {
        @apply w-full bg-transparent cursor-pointer appearance-none;
    }

    /* Removes default focus */
    input[type="range"]:focus {
        @apply outline-none;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
        border-radius: 0.5rem;
        height: 0.5rem;
        @apply bg-gradient-to-r from-violet-200 to-violet-500;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: -0.5rem;
        background-color: #ffffff;
        border-radius: 0.75rem;
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid darkgray;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
        outline: none;
    }

    /******** Firefox styles ********/
    /* slider track */
    input[type="range"]::-moz-range-track {
        border-radius: 0.5rem;
        height: 0.5rem;
        @apply bg-blue-500;
    }

    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: -0.5rem;
        background-color: #ffffff;
        border-radius: 0.75rem;
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid darkgray;
    }

    input[type="range"]:focus::-moz-range-thumb {
        outline: none;
    }
</style>
