<script lang="ts">
import { onMount } from 'svelte'

interface Props {
  scramble: string;
  puzzleType?: '2x2' | '3x3' | '4x4' | '5x5' | '6x6' | '7x7' | 'pyraminx' | 'megaminx' | 'skewb' | 'clock';
}

let { scramble, puzzleType = '3x3' }: Props = $props()

const events = {
  '3x3': '333',
  '2x2': '222',
  '4x4': '444',
  '5x5': '555',
  '6x6': '666',
  '7x7': '777',
  'pyraminx': 'pyram',
  'megaminx': 'minx',
  'skewb': 'skewb',
  'clock': 'clock',
}

let container = $state<HTMLElement>()

onMount(async () => {
  let ScrambleDisplay = (await import('scramble-display')).ScrambleDisplay

  const display = new ScrambleDisplay()
  display.event = events[puzzleType]
  display.scramble = scramble
  display.visualization = '2D'

  container?.appendChild(display)
})
</script>

<div class="w-[384px] h-[256px]" bind:this={container}></div>
