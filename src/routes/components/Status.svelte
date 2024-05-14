<script>
    export let name;
    export let value;
</script>

<div class="flex flex-col justify-center items-center basis-1/2">
    <h2 class="uppercase text-gray-600 font-medium text-md">{name}</h2>
    <p class="font-semibold text-xl">{value ? value : '-'}</p>
</div>