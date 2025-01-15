<script lang="ts">
import CTSolveTime from '$lib/components/cubetime/CTSolveTime.svelte'
import { type PuzzleType, scrambleData } from '$lib/composables'

let typeValue = $state<string>('3x3')

function updateCubeType() {
  scrambleData.puzzleType = typeValue as PuzzleType
}
</script>

<div class="absolute bottom-10 left-10 bg-gray-50 shadow-md flex flex-col justify-center items-start gap-7 px-3 py-2.5 rounded-md w-96 z-50">
  <div class="flex justify-between items-center gap-4 w-full relative">
    <h2 class="font-semibold">Session 1</h2>
    <select
      bind:value={typeValue} class="text-violet-600 outline-none cursor-pointer bg-transparent text-end font-medium"
      onchange={updateCubeType}
    >
      <option value="3x3">3x3</option>
      <option value="2x2">2x2</option>
      <option value="4x4">4x4</option>
      <option value="5x5">5x5</option>
      <option value="6x6">6x6</option>
      <option value="7x7">7x7</option>
      <option value="pyraminx">Pyraminx</option>
      <option value="megaminx">Megaminx</option>
      <option value="skewb">Skewb</option>
      <option value="clock">Magic Clock</option>
    </select>
  </div>
  {#if scrambleData.scrambles}
    <div class="grid grid-cols-3 max-h-[172px] gap-2 w-full overflow-y-auto">
      {#each scrambleData.scrambles as scramble (scramble.date)}
        <CTSolveTime solveData={scramble} />
      {/each}
    </div>
  {/if}
</div>
