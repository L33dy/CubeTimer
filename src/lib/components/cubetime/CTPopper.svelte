<script lang="ts">
    import {fade} from "svelte/transition";
</script>

<div transition:fade={{duration: 100}}
     class="absolute top-full translate-y-2 bg-white w-52 flex flex-col border-1 border-gray-200 rounded-lg z-10">
    <div class="whitespace-nowrap">
        <slot />
    </div>
</div>
