<script lang="ts">
import SettingsMenu from '$lib/components/settings/SettingsMenu.svelte'
import SettingsSubMenu from '$lib/components/settings/SettingsSubMenu.svelte'
import SettingsSubMenuItem from '$lib/components/settings/SettingsSubMenuItem.svelte'
import CTSwitch from '$lib/components/cubetime/CTSwitch.svelte'
import SettingsSubMenuDivider from '$lib/components/settings/SettingsSubMenuDivider.svelte'
import CTCounter from '$lib/components/cubetime/CTCounter.svelte'
import CTSelect from '$lib/components/cubetime/CTSelect.svelte'
import CTButton from '$lib/components/cubetime/CTButton.svelte'
import { createModal } from '$lib/modal/index.svelte'
import { clamp, resetSettings, settings, type TimerSettings, updateSettingValue } from '$lib/composables'

let timerSettings = $derived<TimerSettings>(settings.value.timerSettings)

function reset() {
  createModal({
    type: 'confirm',
    title: 'Are you sure you want to reset the settings?',
    description: 'Your solves and sessions will be kept.',
    onConfirm: resetSettings,
  })
}
</script>

<svelte:head>
  <title>CubeTimer | Settings</title>
</svelte:head>

<div class="flex flex-col justify-center items-center gap-8">
  <SettingsMenu name="General" icon="i-[fa6-solid--gears]">
    <SettingsSubMenu name="Timer Settings" icon="i-[gg--timer]">
      <SettingsSubMenuItem>
        {#snippet title()}
          <h4 >
            Use Inspection
          </h4>
        {/snippet}
        <CTSwitch checked={timerSettings.useInspection} onCheck={(checked) => updateSettingValue('timerSettings', 'useInspection', checked)} />
      </SettingsSubMenuItem>
      {#if timerSettings.useInspection}
        <SettingsSubMenuItem>
          {#snippet title()}
            <h4 >
              Inspection Counts Down
            </h4>
          {/snippet}
          <CTSwitch checked={timerSettings.inspectionCountsDown} onCheck={(checked) => updateSettingValue('timerSettings', 'inspectionCountsDown', checked)} />
        </SettingsSubMenuItem>
        <SettingsSubMenuItem>
          {#snippet title()}
            <h4 >
              Show Cancel Inspection
            </h4>
          {/snippet}
          <CTSwitch checked={timerSettings.showCancelInspection} onCheck={(checked) => updateSettingValue('timerSettings', 'showCancelInspection', checked)} />
        </SettingsSubMenuItem>
      {/if}

      <SettingsSubMenuDivider />
      <SettingsSubMenuItem>
        {#snippet title()}
          <h4 >
            Hold Down Time:
            <span class="font-normal">
              {timerSettings.holdTime / 1000}s
            </span>
          </h4>
        {/snippet}
        <CTCounter
          minusDisabled={timerSettings.holdTime === 0} plusDisabled={timerSettings.holdTime === 1000}
          onMinus={() => updateSettingValue('timerSettings', 'holdTime', clamp(timerSettings.holdTime - 10, 0, 1000))}
          onPlus={() => updateSettingValue('timerSettings', 'holdTime', clamp(timerSettings.holdTime + 10, 0, 1000))}
        />
      </SettingsSubMenuItem>
      <SettingsSubMenuDivider />

      <SettingsSubMenuItem>
        {#snippet title()}
          <h4 >
            Timer Mode
          </h4>
        {/snippet}
        <CTSelect
          onChange={(value) => updateSettingValue('timerSettings', 'timerMode', value === 0 ? 'typing' : 'timer')}
          selected={timerSettings.timerMode} options={['Typing', 'Timer']}
        />
      </SettingsSubMenuItem>
      <SettingsSubMenuItem>
        {#snippet title()}
          <h4 >
            Timer Update
          </h4>
        {/snippet}
        <CTSelect
          onChange={(value) => updateSettingValue('timerSettings', 'timerUpdate', value)}
          selected={timerSettings.timerUpdate} options={['0 dec. points', '1 dec. point', '2 dec. points', '3 dec. points']}
        />
      </SettingsSubMenuItem>
    </SettingsSubMenu>
    <div class="flex justify-center">
      <CTButton onclick={reset} icon="i-[bx--reset]" color="red">
        Reset General Settings
      </CTButton>
    </div>
  </SettingsMenu>
</div>
