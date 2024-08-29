<script lang="ts">
    import '../main.css'
    import {scrambleData} from "$lib/store";
    import {onMount} from "svelte";
    import Navbar from "$lib/components/NavBar.svelte";
    import {getData} from "$lib/database";
    import CTLoading from "$lib/components/cubetime/CTLoading.svelte";

    onMount(() => {
        $scrambleData = getData()
    })
</script>

{#if $scrambleData === null}
    <CTLoading />
    {:else}
    <main class="flex w-full h-full">
        <Navbar />
        <div class="ml-[350px] py-24 px-10 h-full w-full relative isolate">
            <slot />
        </div>
    </main>
{/if}
