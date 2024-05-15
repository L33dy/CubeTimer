<script>
    import {getSettings, setSettings} from "$lib/settings.js";
    import {onMount} from "svelte";

    let settings;

    let scrambleSize;

    onMount(() => {
        settings = getSettings()
    })

    function updateSettings() {
        if (scrambleSize.value > 30) {
            scrambleSize.value = 30;
        }
        else if (scrambleSize.value < 5) {
            scrambleSize.value = 5;
        }

        settings.scrambleSize = scrambleSize.value;

        setSettings(settings)
    }
</script>

<main class="w-1/3 mx-auto pt-24">
    <div class="flex flex-col justify-center items-start bg-white w-full rounded-lg px-4 py-3">
        <h2 class="text-xl font-medium">General</h2>
        <div class="flex flex-col justify-start items-start mt-6 w-full">
            <div class="relative w-full flex justify-between items-center text-lg">
                <label for="scramble-size">Scramble move size:</label>
                <input on:focusout={updateSettings} bind:this={scrambleSize} type="number" id="scramble-size" min="5" max="30" value={settings?.scrambleSize}>
            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    input {
        @apply outline-none text-purple-700 text-center;
    }
</style>