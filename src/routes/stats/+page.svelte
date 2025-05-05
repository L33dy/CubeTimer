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
import { onMount, onDestroy } from 'svelte'
import StatsItem from '$lib/components/stats/StatsItem.svelte'

let trendChart = $state<Chart>()
let distributionChart = $state<Chart>()

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

  trendChart = new Chart(timeTrend, {
    type: 'line',
    data: {
      labels: scrambleData.scrambles?.map((_, index) => index + 1),
      datasets: [
        {
          data: times,
          label: 'Time Trend',
          cubicInterpolationMode: 'monotone',
          fill: true,
        }
      ],
    },
  })

  distributionChart = new Chart(timeDistribution, {
    type: 'bar',
    data: {
      labels: distribution.map(d => `${d.start.toFixed(1)}+`),
      datasets: [
        {
          data: distribution.map(d => d.count),
          label: 'Time Distribution',
        }
      ],
    },
  })
}

onMount(() => {
  if (solvesCount >= 2) {
    setTimeout(() => {
      const style = getComputedStyle(document.documentElement)
      let mainColor = style.getPropertyValue('--main')
      let textColor = style.getPropertyValue('--text')

      Chart.defaults.color = textColor
      Chart.defaults.backgroundColor = `${mainColor}CC`
      Chart.defaults.borderColor = mainColor

      initCharts()
    }, 100)
  }
})

onDestroy(() => {
  trendChart?.destroy()
  distributionChart?.destroy()
})
</script>

<svelte:head>
  <title>CubeTimer | Statistics</title>
</svelte:head>

<div class="flex flex-col gap-4 max-w-xl mx-auto w-full">
  <div class="flex gap-4">
    <StatsItem
      class="!w-1/2"
      items={[
        {
          title: 'AO5',
          value: ao5,
        },
        {
          title: 'AO12',
          value: ao12,
        },
        {
          title: 'AO100',
          value: ao100,
        }
      ]}
    >
      Current Stats
    </StatsItem>
    <div class="flex flex-col gap-4 basis-1/2">
      <StatsItem
        color="secondary"
        items={[
          {
            value: solvesCount,
          }
        ]}
      >
        Solve Count
      </StatsItem>
      <StatsItem
        color="secondary"
        items={[
          {
            value: sessionMean,
          }
        ]}
      >
        Session Mean
      </StatsItem>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col gap-4 w-1/2">
      <button
        class="w-full h-full" disabled={bestSingle === undefined}
        onclick={() => showDetail(bestSingle)}
      >
        <StatsItem
          color="main"
          items={[
            {
              value: bestSingle?.time,
            }
          ]}
        >
          Best Single
        </StatsItem>
      </button>
      <StatsItem
        items={[
          {
            title: 'AO12',
            value: ao12,
          },
          {
            title: 'AO100',
            value: ao100,
          }
        ]}
      >
        Best Stats
      </StatsItem>
    </div>
    <div class="flex w-1/2">
      <StatsItem>
        Best Ao5
      </StatsItem>
    </div>
  </div>
  <StatsItem noRenderItems>
    Time Trend
    {#snippet content()}
      {#if solvesCount >= 2}
        <canvas id="timeTrend" class="w-full"></canvas>

      {:else}

        <div class="flex justify-center items-center w-full h-full min-h-40">
          <p class="text-background-alt">Not enough solves to show time trend.</p>
        </div>
      {/if}
    {/snippet}
  </StatsItem>
  <StatsItem noRenderItems>
    Time Distribution
    {#snippet content()}
      {#if solvesCount >= 2}
        <canvas id="timeDistribution" class="w-full"></canvas>

      {:else}

        <div class="flex justify-center items-center w-full h-full min-h-40">
          <p class="text-background-alt">Not enough solves to show time trend.</p>
        </div>
      {/if}
    {/snippet}
  </StatsItem>
</div>
