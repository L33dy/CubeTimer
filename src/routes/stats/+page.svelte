<script lang="ts">
import {
  getAverage,
  getBestSingle,
  getMeanTime,
  getTimeDistribution,
  getTimes,
  scrambleData,
  showDetail
} from '$lib/composables'
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

let distribution = $derived(getTimeDistribution())

function initCharts() {
  const timeTrend = document.getElementById('timeTrend') as HTMLCanvasElement
  const timeDistribution = document.getElementById('timeDistribution') as HTMLCanvasElement

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

  new Chart(timeDistribution, {
    type: 'bar',
    data: {
      labels: distribution.map(d => `${d.start.toFixed(1)}+`),
      datasets: [
        {
          data: distribution.map(d => d.count),
          label: 'Time Distribution',
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

<div class="flex flex-col gap-4 max-w-xl mx-auto w-full">
  <div class="flex gap-4">
    <StatsItem class="w-1/2">
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
    <div class="flex flex-col gap-4 basis-1/2">
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
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col gap-4 w-1/2">
      <button class="w-full h-full" onclick={() => showDetail(bestSingle)}>
        <StatsItem color="secondary">
          <div class="flex flex-col gap-2">
            <span class="uppercase text-sm font-medium">
              Best Single
            </span>
            <span class="font-bold text-3xl w-fit">
              {bestSingle?.time ? bestSingle?.time : '-'}
            </span>
          </div>
        </StatsItem>
      </button>
      <StatsItem>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600">
              BEST AO12
            </span>
            <span class="font-bold">
              { ao12 ? ao12 : '-' }
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600">
              BEST AO100
            </span>
            <span class="font-bold">
              { ao100 ? ao12 : '-' }
            </span>
          </div>
        </div>
      </StatsItem>
    </div>
    <div class="flex w-1/2">
      <StatsItem>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-600">
            BEST AO5
          </span>
        </div>
      </StatsItem>
    </div>
  </div>
  <StatsItem>
    {#if solvesCount >= 2}
      <canvas id="timeTrend" class="w-full"></canvas>

    {:else}

      <div class="flex justify-center items-center w-full h-full min-h-40">
        <p>Not enough solves to show time trend.</p>
      </div>
    {/if}
  </StatsItem>
  <StatsItem>
    {#if solvesCount >= 2}
      <canvas id="timeDistribution" class="w-full"></canvas>

    {:else}

      <div class="flex justify-center items-center w-full h-full min-h-40">
        <p>Not enough solves to show time trend.</p>
      </div>
    {/if}
  </StatsItem>
</div>
