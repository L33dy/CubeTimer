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
</script>

<div class="w-1/3 mx-auto pt-14">
    <div class="flex flex-col justify-center items-start bg-white w-full rounded-lg px-4 py-3">
        <h2 class="text-xl font-medium">General</h2>
        <div class="flex justify-between items-center mt-6 w-full">
            <div class="relative w-full flex justify-between items-center gap-3">
                <label for="lang-selector" class="text-lg">Language</label>
                <select class="outline-none cursor-pointer" id="lang-selector">
                    <option value="en" selected>English</option>
                </select>
            </div>
        </div>
    </div>
</div>