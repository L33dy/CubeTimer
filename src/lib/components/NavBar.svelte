<script>
    import {page} from "$app/stores";
    import {version} from "$app/environment";
</script>

<div class="bg-white h-[100vh] w-full px-6 py-5 flex flex-col">
    <h1 class="text-3xl font-medium bg-gradient-to-r from-violet-500 to-violet-200 text-transparent bg-clip-text">CubeTimer.</h1>
    <nav class="w-full flex flex-col justify-start items-start gap-5 mt-10 ml-3">
        <a href="/" class:active={$page.url.pathname === "/"}>
            <img src="../../../icons/stopwatch.svg" alt="stopwatch" class="w-7">
            <span>Timer</span>
        </a>
        <a href="/solves" class:active={$page.url.pathname === "/solves"}>
            <img src="../../../icons/hourglass.svg" alt="menu" class="w-7">
            <span>Solves</span>
        </a>
        <a href="/docs" class:active={$page.url.pathname === "/docs"}>
            <img src="../../../icons/docs.svg" alt="docs" class="w-6 ml-1">
            <span>Documentation</span>
        </a>
        <!--<a href="/settings" class:active={$page.url.pathname === "/settings"}>
            <img src="../../../icons/wrench.svg" alt="wrench" class="w-7">
            <span>Settings</span>
        </a>-->
    </nav>
    <div class="flex justify-between w-full mt-auto">
        <div class="flex flex-col gap-1.5">
            <small>Built with</small>
            <div class="flex gap-2">
                <img src="../../../icons/svelte.svg" alt="svelte" class="w-6">
                <img src="../../../icons/tailwind.svg" alt="tailwind" class="w-6">
                <img src="../../../icons/netlify.svg" alt="netlify" class="w-6">
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

    :global(a:not(.active)) {
        @apply opacity-50;
    }
</style>
