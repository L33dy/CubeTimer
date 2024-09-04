<script lang="ts">
    import SettingsMenu from "$lib/components/settings/SettingsMenu.svelte";
    import SettingsSubMenu from "$lib/components/settings/SettingsSubMenu.svelte";
    import SettingsSubMenuItem from "$lib/components/settings/SettingsSubMenuItem.svelte";
    import CTSwitch from "$lib/components/cubetime/CTSwitch.svelte";
    import SettingsSubMenuDivider from "$lib/components/settings/SettingsSubMenuDivider.svelte";
    import CTCounter from "$lib/components/cubetime/CTCounter.svelte";
    import {settingsData} from "$lib/store";
    import type {TimerSettings} from "$lib/types/settings.type";
    import {updateSettingValue} from "$lib/settings";
    import {clamp} from "$lib/math";
    import CTSelect from "$lib/components/cubetime/CTSelect.svelte";

    let timerSettings: TimerSettings;

    $: if ($settingsData) {
        ({timerSettings} = $settingsData);
    }
</script>

<SettingsMenu name="General" icon="i-[fa6-solid--gears]">
    <SettingsSubMenu name="Timer Settings" icon="i-[gg--timer]">
        <SettingsSubMenuItem>
            <h4 slot="title">
                Use Inspection
            </h4>
            <CTSwitch checked={timerSettings.useInspection} onCheck={(checked) => updateSettingValue("timerSettings", "useInspection", checked)} />
        </SettingsSubMenuItem>
        <SettingsSubMenuItem>
            <h4 slot="title">
                Inspection Counts Down
            </h4>
            <CTSwitch checked={timerSettings.inspectionCounts} onCheck={(checked) => updateSettingValue("timerSettings", "inspectionCounts", checked)} />
        </SettingsSubMenuItem>

        <SettingsSubMenuDivider />
        <SettingsSubMenuItem>
            <h4 slot="title">
                Hold Down Time:
                <span class="font-normal">
                    {timerSettings.holdTime / 1000}s
                </span>
            </h4>
            <CTCounter onMinus={() => updateSettingValue("timerSettings", "holdTime", clamp(timerSettings.holdTime - 10, 0, 1000))}
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
