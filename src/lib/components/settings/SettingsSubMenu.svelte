<script lang="ts">
    export let name: string;
    export let icon: string | undefined = undefined;
</script>

<div class="flex flex-col gap-4 bg-white rounded-lg mx-24 py-1.5 px-2.5">
    <div class="flex items-center gap-2">
        {#if icon}
            <span class={`${icon} text-primary-500 text-xl`} />
        {/if}
        <h3 class="font-semibold">
            {name}
        </h3>
    </div>
    <div class="flex flex-col gap-2">
        <slot />
    </div>
</div>
