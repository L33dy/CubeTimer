<script lang="ts">
interface Props {
  onMinus: () => void;
  onPlus: () => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
}

let {
  onMinus,
  onPlus,
  minusDisabled = false,
  plusDisabled = false,
}: Props = $props()
</script>

<div class="rounded-lg flex items-center bg-text h-7 overflow-hidden">
  <button aria-label="Minus" disabled={minusDisabled} onclick={onMinus}>
    <span class="i-[ic--baseline-minus] text-background"></span>
  </button>
  <div class="w-[1px] h-3/4 bg-background"></div>
  <button aria-label="Plus" disabled={plusDisabled} onclick={onPlus}>
    <span class="i-[ic--baseline-plus] text-background"></span>
  </button>
</div>

<style>
    button {
        @apply px-4 flex justify-center items-center bg-text hover:brightness-90 transition-all duration-300 ease-in-out w-full h-full;
    }

    button:disabled {
        @apply hover:brightness-100 opacity-50;
    }
</style>
