<script lang="ts">
    import '../main.css'
    import {scrambleData} from "$lib/store";
    import {onMount} from "svelte";
    import Navbar from "$lib/components/NavBar.svelte";
    import {getData} from "$lib/database";
    import CTLoading from "$lib/components/cubetime/CTLoading.svelte";
    import CTSolveTimeDetail from "$lib/components/cubetime/CTSolveTimeDetail.svelte";
    import {detailData, show, hideDetail} from "$lib/solveDetail";

    onMount(() => {
        $scrambleData = getData()
    })
</script>

{#if $scrambleData === null}
    <CTLoading />
    {:else}
    <main class="flex w-full h-full">
        <Navbar />
        <div class="ml-[350px] py-24 px-10 h-full w-full relative">
            <slot />
        </div>
    </main>
{/if}

{#if $show && $detailData}
    <svelte:component this={CTSolveTimeDetail} solveData={$detailData} on:hide={hideDetail} />
{/if}
