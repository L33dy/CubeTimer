<script lang="ts">
import FooterItem from '$components/footer/FooterItem.svelte'
import { version } from '$app/environment'
import { createModal } from '$packages/modal/index.svelte'
import { settings } from '$composables'

function openThemeModal() {
  createModal({
    type: 'theme',
    noPadding: true,
  })
}
</script>

<footer class="flex justify-between items-center max-w-10xl w-full mx-auto px-10 py-4">
  <div class="flex items-center gap-4">
    <FooterItem icon="i-[ri--code-s-slash-line]" href="https://github.com/L33dy/CubeTimer">
      github
    </FooterItem>
  </div>
  <div class="flex items-center gap-4">
    <FooterItem icon="i-[ri--palette-line]" onclick={openThemeModal}>
      {settings.value.appearanceSettings.theme}
    </FooterItem>
    <FooterItem icon="i-[ri--git-branch-line]">
      v{version}
    </FooterItem>
  </div>
</footer>
