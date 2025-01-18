<script lang="ts">
import '../main.css'
import { onMount, type Snippet } from 'svelte'
import { currentModal } from '$packages/modal/index.svelte'
import { Toaster } from 'svelte-french-toast'
import SolveTimeDetail from '$lib/components/solveDetail/SolveTimeDetail.svelte'
import ModalMain from '$lib/components/modals/ModalMain.svelte'
import { detailData, getData, getSettings, hideDetail, scrambleData, settings } from '$lib/composables'
import NavBar from '$lib/components/nav/NavBar.svelte'
import CTLoading from '$lib/components/cubetime/CTLoading.svelte'
import Changelog from '$components/changelog/Changelog.svelte'
import { changelog } from '$packages/changelog/index.svelte'

interface Props {
  children?: Snippet
}

let { children }: Props = $props()

onMount(() => {
  scrambleData.scrambles = getData()
  settings.value = getSettings()
})
</script>


{#if scrambleData.scrambles}
  <main class="w-full h-full">
    <div class="py-24 px-10 min-h-screen w-full max-w-10xl mx-auto relative">
      {@render children?.()}
    </div>
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

<Toaster />
