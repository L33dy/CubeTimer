<script lang="ts">

interface Props {
  selected?: number | string | undefined;
  options: string[];
  onChange: (value: number) => void;
}

let { selected = undefined, options, onChange }: Props = $props()

let select = $state<HTMLSelectElement>()
</script>

<select onchange={() => onChange(select?.selectedIndex ?? 0)} bind:this={select}>
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
