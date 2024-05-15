<script>
    import {getSettings, setSettings} from "$lib/settings.js";
    import {onMount} from "svelte";

    let settings;

    $: if (settings) {
        updateSettings()
    }

    onMount(() => {
        settings = getSettings()
    })

    function updateSettings() {
        setSettings(settings)
    }

    function incrementScrambleSize() {
        settings.scrambleSize++;

        if (settings.scrambleSize > 30) settings.scrambleSize = 30;
    }

    function decrementScrambleSize() {
        settings.scrambleSize--;

        if (settings.scrambleSize < 5) settings.scrambleSize = 5;
    }
</script>

<div class="flex flex-col justify-center items-start bg-white w-full rounded-lg px-4 py-3">
    <h2 class="text-xl font-medium">General</h2>
    <div class="flex justify-between items-center mt-6 w-full">
        <div class="relative w-full flex justify-start items-center text-lg">
            <label for="scramble-size">Scramble size:</label>
            <p class="text-purple-700 text-center" id="scramble-size">{settings?.scrambleSize ? settings?.scrambleSize : ""}</p>
        </div>
        <div class="flex justify-center items-center bg-gray-300 rounded-lg text-lg">
            <button class="pl-2 pr-5" on:click={decrementScrambleSize}>-</button>
            <div class="w-[1px] h-4 bg-gray-400"></div>
            <button class="pr-2 pl-5" on:click={incrementScrambleSize}>+</button>
        </div>
    </div>
</div>