<script lang="ts">
    export let onMinus: () => void;
    export let onPlus: () => void;
    export let minusDisabled: boolean = false;
    export let plusDisabled: boolean = false;
</script>

<div class="rounded-lg flex items-center bg-gray-300 h-7 overflow-hidden">
    <button disabled={minusDisabled} on:click={onMinus}>
        <span class="i-[ic--baseline-minus]" />
    </button>
    <div class="w-[1px] h-3/4 bg-gray-400" />
    <button disabled={plusDisabled} on:click={onPlus}>
        <span class="i-[ic--baseline-plus]" />
    </button>
</div>

<style>
    button {
        @apply px-4 flex justify-center items-center bg-gray-300 hover:brightness-90 transition-all duration-300 ease-in-out w-full h-full;
    }

    button:disabled {
        @apply hover:brightness-100 opacity-50;
    }
</style>
