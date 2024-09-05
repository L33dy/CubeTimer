<script lang="ts">
    export let name: string;
    export let icon: string | undefined = undefined;
</script>

<div class="flex flex-col gap-6 max-w-3xl mx-auto w-full">
    <div class="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-sm">
        <h2 class="text-xl font-bold">
            {name}
        </h2>
        {#if icon}
            <span class={`${icon} text-5xl`} />
        {/if}
    </div>

    <slot />
</div>
