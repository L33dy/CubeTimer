<script lang="ts">
    export let onMinus: () => void;
    export let onPlus: () => void;
</script>

<div class="bg-gray-300 rounded-lg flex items-center h-7">
    <button on:click={onMinus} class="px-4 flex justify-center items-center">
        <span class="i-[ic--baseline-minus]" />
    </button>
    <div class="w-[1px] h-3/4 bg-gray-400" />
    <button on:click={onPlus} class="px-4 flex justify-center items-center">
        <span class="i-[ic--baseline-plus]" />
    </button>
</div>
