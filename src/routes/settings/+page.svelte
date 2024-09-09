<script lang="ts">
    import SettingsMenu from "$lib/components/settings/SettingsMenu.svelte";
    import SettingsSubMenu from "$lib/components/settings/SettingsSubMenu.svelte";
    import SettingsSubMenuItem from "$lib/components/settings/SettingsSubMenuItem.svelte";
    import CTSwitch from "$lib/components/cubetime/CTSwitch.svelte";
    import SettingsSubMenuDivider from "$lib/components/settings/SettingsSubMenuDivider.svelte";
    import CTCounter from "$lib/components/cubetime/CTCounter.svelte";
    import {settingsData} from "$lib/store";
    import type {TimerSettings} from "$lib/types/settings.type";
    import {resetSettings, updateSettingValue} from "$lib/settings";
    import {clamp} from "$lib/math";
    import CTSelect from "$lib/components/cubetime/CTSelect.svelte";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import {createModal} from "$lib/modal";

    let timerSettings: TimerSettings;

    $: if ($settingsData) {
        ({timerSettings} = $settingsData);
    }

    function reset() {
        createModal({
            type: 'confirm',
            title: 'Are you sure you want to reset the settings?',
            description: 'Your solves and sessions will be kept.',
            onConfirm: resetSettings
        })
    }
</script>

<div class="flex flex-col justify-center items-center gap-6">
    <SettingsMenu name="General" icon="i-[fa6-solid--gears]">
        <SettingsSubMenu name="Timer Settings" icon="i-[gg--timer]">
            <SettingsSubMenuItem>
                <h4 slot="title">
                    Use Inspection
                </h4>
                <CTSwitch checked={timerSettings.useInspection} onCheck={(checked) => updateSettingValue("timerSettings", "useInspection", checked)} />
            </SettingsSubMenuItem>
            {#if timerSettings.useInspection}
                <SettingsSubMenuItem>
                    <h4 slot="title">
                        Inspection Counts Down
                    </h4>
                    <CTSwitch checked={timerSettings.inspectionCountsDown} onCheck={(checked) => updateSettingValue("timerSettings", "inspectionCountsDown", checked)} />
                </SettingsSubMenuItem>
                <SettingsSubMenuItem>
                    <h4 slot="title">
                        Show Cancel Inspection
                    </h4>
                    <CTSwitch checked={timerSettings.showCancelInspection} onCheck={(checked) => updateSettingValue("timerSettings", "showCancelInspection", checked)} />
                </SettingsSubMenuItem>
            {/if}

            <SettingsSubMenuDivider />
            <SettingsSubMenuItem>
                <h4 slot="title">
                    Hold Down Time:
                    <span class="font-normal">
                    {timerSettings.holdTime / 1000}s
                </span>
                </h4>
                <CTCounter minusDisabled={timerSettings.holdTime === 0} plusDisabled={timerSettings.holdTime === 1000}
                        onMinus={() => updateSettingValue("timerSettings", "holdTime", clamp(timerSettings.holdTime - 10, 0, 1000))}
                        onPlus={() => updateSettingValue("timerSettings", "holdTime", clamp(timerSettings.holdTime + 10, 0, 1000))} />
            </SettingsSubMenuItem>
            <SettingsSubMenuDivider />

            <SettingsSubMenuItem>
                <h4 slot="title">
                    Timer Update
                </h4>
                <CTSelect onChange={(value) => updateSettingValue("timerSettings", "timerUpdate", value)}
                          selected={timerSettings.timerUpdate} options={["0 dec. points", "1 dec. point", "2 dec. points", "3 dec. points"]} />
            </SettingsSubMenuItem>
        </SettingsSubMenu>
    </SettingsMenu>

    <CTButton on:click={reset} icon="i-[bx--reset]" color="red">
        Reset Settings
    </CTButton>
</div>
