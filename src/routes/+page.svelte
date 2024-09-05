<script lang="ts">
    import {fade} from "svelte/transition";
    import {scramble} from 'cube-scramble.js'
    import {puzzleType, sequence, scrambleData} from "$lib/store.js";
    import Session from "$lib/components/Session.svelte";
    import Stats from "$lib/components/Stats.svelte";
    import {
        togglePrepare,
        timerState,
        inspectionState,
        toggleStart,
        time,
        inspectionTime,
        cancelInspection
    } from "$lib/timer";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import {InspectionState, TimerState} from "$lib/types/timer.type";

    function keyDown(e: KeyboardEvent): void {
        if (e.code === "Enter") {
            generateNewSequence()
        }
    }

    function generateNewSequence(): void {
        $sequence = scramble($puzzleType).join(' ')
    }

    $: ($scrambleData, $puzzleType), generateNewSequence()
</script>

<svelte:body on:keydown={(e) => {keyDown(e); togglePrepare(e)}} on:keyup={toggleStart}/>

<Session/>
<Stats/>

<div class="flex flex-col justify-center items-center mt-32 mx-auto w-3/4 relative">
    {#key $sequence}
        <p in:fade={{duration: 450}} class:opacity-0={$timerState !== TimerState.IDLE}
           class="text-4xl font-medium transition-opacity duration-150 text-center cursor-default"
        >
            {$sequence ? $sequence : ""}
        </p>
    {/key}
</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {#if $inspectionState === InspectionState.NONE}
        <p class:text-black={$timerState === TimerState.IDLE || $timerState === TimerState.RUNNING}
           class:text-red-500={$timerState === TimerState.PREPARING}
           class:text-green-500={$timerState === TimerState.PREPARED}
           class="text-6xl font-bold transition-all duration-300 ease-in-out" class:scale-150={$timerState === TimerState.RUNNING}
        >
            {`${$time.seconds}.${$time.milliseconds.toString().padStart(3, "0")}`}
        </p>
        {:else}
        <div class="flex flex-col justify-center items-center gap-4">
            <p class="text-6xl font-bold w-fit">
                {$inspectionTime}
            </p>
            <CTButton on:click={cancelInspection} color="white">
                Cancel
            </CTButton>
        </div>
    {/if}
</div>
