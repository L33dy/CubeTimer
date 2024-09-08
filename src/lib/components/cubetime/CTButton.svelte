<script lang="ts">
    export let color: 'primary' | 'secondary' | 'white' | 'red' | 'green' = 'secondary'
    export let size: 'small' | 'default' = 'default'
    export let icon: string | undefined = undefined
    export let disabled: boolean = false
</script>

<button class:primary={color === 'primary'} class:secondary={color === 'secondary'} class:white={color === 'white'}
        class:red={color === 'red'} class:!text-sm={size === 'small'} class:green={color === 'green'}
        class="rounded-md font-medium transition-colors duration-300 ease-in-out px-1.5 py-0.5 flex justify-center items-center gap-1 outline-none"
        on:click disabled={disabled}>
    {#if icon}
        <span class={`${icon} text-lg`} />
    {/if}
    <slot />
</button>

<style lang="postcss">
    .primary {
        @apply bg-violet-200 text-violet-600 hover:bg-violet-300;
    }

    .secondary {
        @apply text-gray-800 bg-gray-200 hover:bg-gray-300;
    }

    .white {
        @apply bg-white disabled:text-violet-700 shadow-sm border-1 border-gray-200;
    }

    .white:not(:disabled) {
        @apply hover:bg-gray-100;
    }

    .red {
        @apply bg-red-200 text-red-600 hover:bg-red-300;
    }

    .green {
        @apply bg-green-200 text-green-600 hover:bg-green-300;
    }
</style>
