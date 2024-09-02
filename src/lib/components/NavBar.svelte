<script lang="ts">
    import {page} from "$app/stores";
    import {version} from "$app/environment";
</script>

<div class="bg-white h-screen fixed top-0 w-[350px] px-6 py-5 flex flex-col shadow-sm">
    <h1 class="text-3xl font-medium bg-gradient-to-r from-violet-500 to-violet-200 text-transparent bg-clip-text">CubeTimer.</h1>
    <nav class="w-full flex flex-col justify-start items-start gap-5 mt-10 ml-3">
        <a href="/" class:active={$page.url.pathname === "/"}>
            <span class="i-[mdi--stopwatch] text-2xl" />
            <span>Timer</span>
        </a>
        <a href="/solves" class:active={$page.url.pathname === "/solves"}>
            <span class="i-[f7--hourglass-bottomhalf-fill] text-2xl" />
            <span>Solves</span>
        </a>
        <a href="/docs" class:active={$page.url.pathname === "/docs"}>
            <span class="i-[mingcute--paper-fill] text-2xl" />
            <span>Documentation</span>
        </a>
        <!--<a href="/settings" class:active={$page.url.pathname === "/settings"}>
            <span class="i-[mingcute--settings-3-fill] text-2xl" />
            <span>Settings</span>
        </a>-->
    </nav>
    <div class="flex justify-between w-full mt-auto">
        <div class="flex flex-col gap-1.5">
            <small>Built with</small>
            <div class="flex gap-2">
                <span class="i-[devicon--svelte] text-lg" />
                <span class="i-[devicon--tailwindcss] text-lg" />
                <span class="i-[devicon--typescript] text-lg" />
            </div>
        </div>
        <div class="flex place-self-end">
            <small class="h-fit">ver. {version}</small>
        </div>
    </div>
</div>

<style lang="postcss">
    a {
        @apply flex justify-start items-center gap-3 w-full text-lg font-medium transition-opacity duration-300;
    }

    a:not(.active) {
        @apply opacity-50;
    }

    a:not(.active):hover {
        @apply opacity-65;
    }
</style>
