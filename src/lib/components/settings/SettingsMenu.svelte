<script lang="ts">
    export let name: string;
    export let icon: string | undefined = undefined;
</script>

<div class="flex flex-col gap-4 max-w-3xl mx-auto">
    <div class="flex justify-between items-center px-4 py-2 bg-white rounded-lg">
        <h2 class="text-xl font-bold">
            {name}
        </h2>
        {#if icon}
            <span class={`${icon} text-5xl`} />
        {/if}
    </div>

    <slot />
</div>
