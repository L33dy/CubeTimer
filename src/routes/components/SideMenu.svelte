<script>
    import {page} from "$app/stores";
</script>

<div class="bg-white h-[100vh] w-[350px] fixed top-0 left-0 px-6 py-5">
    <h1 class="text-3xl font-medium bg-gradient-to-r from-violet-300 to-violet-500 text-transparent bg-clip-text">CubeTimer.</h1>
    <nav class="w-full flex flex-col justify-start items-start gap-5 mt-10 ml-3">
        <a href="/" class:active={$page.url.pathname === "/"}>
            <img src="../../../icons/stopwatch.svg" alt="stopwatch" class="w-7">
            <span>Timer</span>
        </a>
        <a href="/solves" class:active={$page.url.pathname === "/solves"}>
            <img src="../../../icons/hourglass.svg" alt="menu" class="w-7">
            <span>Solves</span>
        </a>
        <a href="/settings" class:active={$page.url.pathname === "/settings"}>
            <img src="../../../icons/wrench.svg" alt="wrench" class="w-7">
            <span>Settings</span>
        </a>
    </nav>
</div>

<style lang="postcss">
    a {
        @apply flex justify-start items-center gap-3 w-full text-lg font-medium transition-opacity duration-300;
    }

    :global(a:not(.active)) {
        @apply opacity-50;
    }
</style>