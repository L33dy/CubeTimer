<script lang="ts">
    import {Penalty, type Solve} from "$lib/types/solve.type";

    export let solveData: Solve;
    export let editable: boolean = false;

    $: ({time, penalty} = solveData)
</script>

<button on:click
        disabled={!editable}
        class="transition-all duration-300 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm border-1 border-transparent disabled:hover:border-transparent hover:border-primary-200 flex flex-col justify-center items-center h-[54px] outline-none">
    <span class="font-semibold text-lg">
        { penalty === Penalty.None ? time.toFixed(3) : penalty === Penalty.PlusTwo ? `${time.toFixed(3)}+` : 'DNF' }
    </span>
</button>
