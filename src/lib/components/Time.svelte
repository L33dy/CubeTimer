<script lang="ts">
    import {Penalty} from "$lib/types/solve.type";

    export let time;
    export let penalty;
</script>

<div class="transition-colors duration-500 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm flex flex-col justify-center items-center h-[54px] outline-none">
    <span class="font-semibold text-lg">
        { penalty === Penalty.None ? time : penalty === Penalty.PlusTwo ? `${time}+` : 'DNF' }
    </span>
</div>
