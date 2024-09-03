<script lang="ts">
    import SettingsMenu from "$lib/components/settings/SettingsMenu.svelte";
    import SettingsSubMenu from "$lib/components/settings/SettingsSubMenu.svelte";
    import SettingsSubMenuItem from "$lib/components/settings/SettingsSubMenuItem.svelte";
    import CTSwitch from "$lib/components/cubetime/CTSwitch.svelte";
</script>

<SettingsMenu name="General" icon="i-[fa6-solid--gears]">
    <SettingsSubMenu name="Timer Settings" icon="i-[gg--timer]">
        <SettingsSubMenuItem>
            <h4 slot="title">
                Use Inspection
            </h4>
            <CTSwitch onCheck={() => console.log("switched")} />
        </SettingsSubMenuItem>
        <SettingsSubMenuItem>
            <h4 slot="title">
                Inspection Counts Down
            </h4>
            <CTSwitch onCheck={() => console.log("boo")} />
        </SettingsSubMenuItem>
    </SettingsSubMenu>
</SettingsMenu>
