<script>
    import '../main.css'
    import Navbar from "./components/Navbar.svelte";
</script>

<main class="w-full mx-auto pt-16 pb-24">
    <Navbar/>
    <slot/>
</main>