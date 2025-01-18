<script lang="ts">
import { fade } from 'svelte/transition'
</script>

<div out:fade={{ duration: 500 }} class="fixed top-0 left-0 w-full h-full z-50 bg-background flex flex-col gap-4 justify-center items-center" >
  <span class="i-[svg-spinners--blocks-shuffle-3] text-3xl text-violet-500"></span>
  <p>Loading...</p>
</div>
