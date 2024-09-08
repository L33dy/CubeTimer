<script lang="ts">
    import '../main.css'
    import {scrambleData, settingsData} from "$lib/store";
    import {onMount} from "svelte";
    import Navbar from "$lib/components/NavBar.svelte";
    import {getData} from "$lib/database";
    import CTLoading from "$lib/components/cubetime/CTLoading.svelte";
    import {detailData, visible, hideDetail} from "$lib/solveDetail";
    import {Toaster} from "svelte-french-toast";
    import {getSettings} from "$lib/settings";
    import SolveTimeDetail from "$lib/components/solveDetail/SolveTimeDetail.svelte";

    onMount(() => {
        $scrambleData = getData()
        $settingsData = getSettings()
    })
</script>

{#if $scrambleData === null}
    <CTLoading />
    {:else}
    <main class="flex w-full h-full">
        <Navbar />
        <div class="ml-[350px] py-24 px-10 min-h-screen w-full relative">
            <slot />
        </div>
    </main>
{/if}

{#if $visible && $detailData}
    <svelte:component this={SolveTimeDetail} solveData={$detailData} on:hide={hideDetail} />
{/if}

<Toaster />
