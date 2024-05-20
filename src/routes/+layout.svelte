<script>
    import '../main.css'
    import {data} from "$lib/store.js";
    import {onMount} from "svelte";
    import SideMenu from "./components/SideMenu.svelte";

    onMount(() => {
        data.set(JSON.parse(localStorage.getItem('solves')))
    })
</script>

<SideMenu />

<main class="ml-[350px] h-[100vh] pt-16 pb-24 relative">
    <slot/>
</main>