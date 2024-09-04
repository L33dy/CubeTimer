<script lang="ts">
    export let checked: boolean = false;
    export let onCheck: (checked: boolean) => void;
</script>

<input bind:checked={checked} on:change={() => onCheck(checked)} type="checkbox" />

<style lang="postcss">
    input {
        @apply appearance-none cursor-pointer relative w-14 h-7 rounded-full outline-none bg-gray-300 transition-colors duration-300 ease-in-out;
    }

    input::after {
        @apply content-[''] absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-white w-6 h-6 transition-all duration-300 ease-in-out;
    }

    input:checked {
        @apply bg-primary-500;
    }

    input:checked::after {
        @apply left-[calc(100%-2px)] -translate-x-full;
    }
</style>
