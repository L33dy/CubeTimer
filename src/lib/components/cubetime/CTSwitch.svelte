<script lang="ts">
    let checked: boolean;

    export let onCheck: (checked: boolean) => void;
</script>

<input bind:checked={checked} on:change={() => onCheck(checked)} type="checkbox" id="switch" />
<label for="switch"></label>

<style lang="postcss">
    input[type=checkbox] {
        @apply w-0 h-0 invisible;
    }

    input:checked + label {
        @apply bg-primary-500;
    }

    input:checked + label:after {
        @apply left-[calc(100%-4px)] -translate-x-full;
    }

    label {
        @apply cursor-pointer bg-gray-500 block rounded-full relative w-12 h-6 transition-colors duration-300 ease-in-out;
    }

    label:after {
        @apply content-[''] absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out;
    }
</style>
