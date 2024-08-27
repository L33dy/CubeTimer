<script lang="ts">
    import {scrambleData} from "$lib/store.js";
    import {getMeanTime, getAverage} from "$lib/utils";

    let mean : number | undefined;
    let ao5 : number | undefined;
    let ao12: number | undefined;
    let ao100: number | undefined;

    $: $scrambleData, (() => {
        mean = getMeanTime()
        ao5 = getAverage(5)
        ao12 = getAverage(12)
        ao100 = getAverage(100)
    })()
</script>

<div class="w-[250px] h-[150px] absolute bottom-10 right-10 flex justify-between items-center flex-wrap bg-white py-1 px-3 rounded-lg shadow-md">
    <div class="flex flex-col justify-center items-center basis-1/2">
        <h2 class="uppercase text-gray-600 font-medium text-md">AO5</h2>
        <p class="font-semibold text-xl">{ao5 ? ao5 : "-"}</p>
    </div>
    <div class="flex flex-col justify-center items-center basis-1/2">
        <h2 class="uppercase text-gray-600 font-medium text-md">AO12</h2>
        <p class="font-semibold text-xl">{ao12 ? ao12 : "-"}</p>
    </div>
    <div class="flex flex-col justify-center items-center basis-1/2">
        <h2 class="uppercase text-gray-600 font-medium text-md">AO100</h2>
        <p class="font-semibold text-xl">{ao100 ? ao100 : "-"}</p>
    </div>
    <div class="flex flex-col justify-center items-center basis-1/2">
        <h2 class="uppercase text-gray-600 font-medium text-md">MEAN</h2>
        <p class="font-semibold text-xl">{mean ? mean : "-"}</p>
    </div>
</div>
