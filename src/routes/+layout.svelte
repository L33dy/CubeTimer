<script lang="ts">
import '../main.css'
import { onMount, type Snippet } from 'svelte'
import { currentModal } from '$packages/modal/index.svelte'
import { Toaster } from 'svelte-french-toast'
import SolveTimeDetail from '$components/solveDetail/SolveTimeDetail.svelte'
import ModalMain from '$components/modals/ModalMain.svelte'
import {
  detailData,
  getData,
  getSettings,
  hideDetail,
  info,
  loadTheme,
  scrambleData,
  settings,
} from '$lib/composables'
import NavBar from '$components/nav/NavBar.svelte'
import CTLoading from '$components/cubetime/CTLoading.svelte'
import Changelog from '$components/changelog/Changelog.svelte'
import { changelog } from '$packages/changelog/index.svelte'
import Footer from '$components/footer/Footer.svelte'

interface Props {
  children?: Snippet
}

let { children }: Props = $props()

onMount(() => {
  info('Loading settings from localStorage..')
  settings.value = getSettings()
  info('Settings loaded!')

  loadTheme(settings.value.appearanceSettings.theme)

  scrambleData.scrambles = getData()
  info('Loaded scrambles from the database.')
})
</script>

{#if scrambleData.scrambles}
  <main class="flex flex-col w-full min-h-screen">
    <NavBar />
    <div class="py-24 px-10 grow w-full max-w-10xl mx-auto relative">
      {@render children?.()}
    </div>
    <Footer />
  </main>

{:else}
  <CTLoading />
{/if}

{#if detailData.value}
  <SolveTimeDetail solveData={detailData.value} hide={hideDetail} />
{/if}

{#if currentModal.value}
  <ModalMain />
{/if}

{#if changelog.visible}
  <Changelog />
{/if}

<Toaster
  toastOptions={{
    className: '!bg-text-alt !text-text',
  }}
/>
