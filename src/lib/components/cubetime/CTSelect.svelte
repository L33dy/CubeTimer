<script lang="ts">
    export let selected: number | string | undefined = undefined
    export let options: string[]

    export let onChange: (value: number) => void

    let select: HTMLSelectElement
</script>

<select on:change={() => onChange(select.selectedIndex)} bind:this={select}>
    {#each options as o, i}
        <option value={o} selected={i === selected || o.toLowerCase() === selected}>
            {o}
        </option>
    {/each}
</select>

<style lang="postcss">
    select {
        @apply outline-none cursor-pointer text-primary-500;
    }
</style>
