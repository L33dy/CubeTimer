<script lang="ts">
interface Props {
  checked?: boolean;
  onCheck: (checked: boolean) => void;
}

let { checked = $bindable(false), onCheck }: Props = $props()
</script>

<input bind:checked={checked} onchange={() => onCheck(checked)} type="checkbox" />

<style lang="postcss">
    input {
        @apply appearance-none cursor-pointer relative w-14 h-7 rounded-full outline-none bg-gray-300 hover:bg-gray-400 transition-colors duration-300 ease-in-out;
    }

    input::after {
        @apply content-[''] absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-white w-6 h-6 transition-all duration-300 ease-in-out;
    }

    input:checked {
        @apply bg-primary-500 hover:bg-primary-600;
    }

    input:checked::after {
        @apply left-[calc(100%-2px)] -translate-x-full;
    }
</style>
