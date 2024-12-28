<script lang="ts">
import { getAverage, getMeanTime } from '$lib/composables'

let mean = $derived(getMeanTime())
let ao5 = $derived(getAverage(5))
let ao12 = $derived(getAverage(12))
let ao100 = $derived(getAverage(100))
</script>

<div class="w-[250px] h-[150px] absolute bottom-10 right-10 flex justify-between items-center flex-wrap bg-white py-1 px-3 rounded-lg shadow-md">
  <div class="flex flex-col justify-center items-center basis-1/2">
    <h2 class="uppercase text-gray-600 font-medium text-md">AO5</h2>
    <p class="font-semibold text-xl">{ao5 ? ao5 : '-'}</p>
  </div>
  <div class="flex flex-col justify-center items-center basis-1/2">
    <h2 class="uppercase text-gray-600 font-medium text-md">AO12</h2>
    <p class="font-semibold text-xl">{ao12 ? ao12 : '-'}</p>
  </div>
  <div class="flex flex-col justify-center items-center basis-1/2">
    <h2 class="uppercase text-gray-600 font-medium text-md">AO100</h2>
    <p class="font-semibold text-xl">{ao100 ? ao100 : '-'}</p>
  </div>
  <div class="flex flex-col justify-center items-center basis-1/2">
    <h2 class="uppercase text-gray-600 font-medium text-md">MEAN</h2>
    <p class="font-semibold text-xl">{mean ? mean : '-'}</p>
  </div>
</div>
