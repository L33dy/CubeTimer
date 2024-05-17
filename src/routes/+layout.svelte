<script>
    import '../main.css'
    import Navbar from "./components/Navbar.svelte";
    import {data} from "$lib/store.js";
    import {onMount} from "svelte";

    onMount(() => {
        // load current data

        data.set(JSON.parse(localStorage.getItem('sessions')))
    })
</script>

<main class="w-full mx-auto pt-16 pb-24">
    <Navbar/>
    <slot/>
</main>