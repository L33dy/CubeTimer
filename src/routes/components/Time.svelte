<script>
    export let time;
    export let penalty;

    let timeText;

    $: {
        timeText = penalty === 0 ? time : penalty === 1 ? `${time}+` : 'DNF';
    }
</script>

<div class="transition-colors duration-500 ease-in-out rounded-md px-7 py-3 bg-white shadow-sm flex flex-col justify-center items-center h-[54px] outline-none">
    <span class="font-semibold text-lg">{timeText}</span>
</div>