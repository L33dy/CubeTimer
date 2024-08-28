<script lang="ts">
    import '../main.css'
    import {scrambleData} from "$lib/store";
    import {onMount} from "svelte";
    import Navbar from "$lib/components/NavBar.svelte";
    import {getData} from "$lib/database";

    onMount(() => {
        $scrambleData = getData()
    })
</script>

<main class="grid grid-cols-main w-full h-full">
    <Navbar />
    <div class="py-24 px-10 h-full relative overflow-auto">
       <slot />
    </div>
</main>
