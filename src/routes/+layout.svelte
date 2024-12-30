<script lang="ts">
import '../main.css'
import { onMount, type Snippet } from 'svelte'
import { currentModal } from '$lib/modal/index.svelte'
import { Toaster } from 'svelte-french-toast'
import SolveTimeDetail from '$lib/components/solveDetail/SolveTimeDetail.svelte'
import ModalMain from '$lib/components/modals/ModalMain.svelte'
import { detailData, getData, getSettings, hideDetail, scrambleData, settings } from '$lib/composables'
import NavBar from '$lib/components/nav/NavBar.svelte'
import CTLoading from '$lib/components/cubetime/CTLoading.svelte'

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
  <main class="flex w-full h-full">
    <NavBar />
    <div class="ml-[350px] py-24 px-10 min-h-screen w-full relative">
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

<Toaster />
