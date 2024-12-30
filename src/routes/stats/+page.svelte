<script lang="ts">
import { getAverage, getBestSingle, getMeanTime, getTimes, scrambleData, showDetail } from '$lib/composables'
import { Chart } from 'chart.js/auto'
import { onMount } from 'svelte'
import StatsItem from '$lib/components/stats/StatsItem.svelte'

let times = $derived(getTimes())

let bestSingle = $derived(getBestSingle())

let ao5 = $derived(getAverage(5))
let ao12 = $derived(getAverage(12))
let ao100 = $derived(getAverage(100))

let sessionMean = $derived(getMeanTime())

let solvesCount = $derived(scrambleData.scrambles?.length ?? 0)

function initCharts() {
  const timeTrend = document.getElementById('timeTrend') as HTMLCanvasElement

  new Chart(timeTrend, {
    type: 'line',
    data: {
      labels: scrambleData.scrambles?.map((_, index) => index + 1),
      datasets: [
        {
          data: times,
          label: 'Time Trend',
          cubicInterpolationMode: 'monotone',
          fill: true,
          borderColor: '#8b5cf6',
          backgroundColor: '#c4b5fd',
        }
      ],
    },
  })
}

onMount(() => {
  initCharts()
})
</script>

<svelte:head>
  <title>CubeTimer | Statistics</title>
</svelte:head>

<div class="max-w-xl mx-auto w-full">
  <div class="grid grid-cols-2 grid-rows-5 gap-4 w-full">
    <StatsItem class="row-span-2">
      <div class="flex flex-col gap-2">
        <span class="uppercase text-sm text-gray-600 font-medium">
          Current Stats
        </span>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-600">
            AO5
          </span>
          <span class="font-bold">
            { ao5 ? ao5 : '-' }
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-600">
            AO12
          </span>
          <span class="font-bold">
            { ao12 ? ao12 : '-' }
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-600">
            AO100
          </span>
          <span class="font-bold">
            { ao100 ? ao12 : '-' }
          </span>
        </div>
      </div>
    </StatsItem>
    <StatsItem>
      <div class="flex flex-col gap-2">
        <span class="uppercase text-sm text-gray-600 font-medium">
          Solve Count
        </span>
        <span class="font-bold text-3xl">
          {solvesCount}
        </span>
      </div>
    </StatsItem>
    <StatsItem>
      <div class="flex flex-col gap-2">
        <span class="uppercase text-sm text-gray-600 font-medium">
          Session Mean
        </span>
        <span class="font-bold text-3xl">
          {sessionMean ? sessionMean : '-'}
        </span>
      </div>
    </StatsItem>
    <button class="w-full h-full" onclick={() => showDetail(bestSingle)}>
      <StatsItem color="secondary">
        <div class="flex flex-col gap-2">
          <span class="uppercase text-sm font-medium">
            Best Single
          </span>
          <span class="font-bold text-3xl">
            {bestSingle?.time ? bestSingle?.time : '-'}
          </span>
        </div>
      </StatsItem>
    </button>
    <StatsItem class="col-span-2 row-span-2">
      {#if solvesCount >= 2}
        <canvas id="timeTrend"></canvas>

      {:else}

        <div class="flex justify-center items-center w-full h-full">
          <p>Not enough solves to show time trend.</p>
        </div>
      {/if}
    </StatsItem>
  </div>
</div>
