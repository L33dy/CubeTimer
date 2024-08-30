<script lang="ts">
    export let color: 'primary' | 'secondary' = 'secondary'
</script>

<button class:primary={color === 'primary'} class:secondary={color === 'secondary'}
        class="rounded-md font-medium transition-colors duration-300 ease-in-out px-1.5 py-0.5 flex justify-center items-center outline-none"
        on:click>
    <slot />
</button>

<style lang="postcss">
    .primary {
        @apply bg-violet-200 text-violet-600 hover:bg-violet-300;
    }

    .secondary {
        @apply text-gray-800 bg-gray-200 hover:bg-gray-300;
    }
</style>
