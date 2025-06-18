<script lang="ts">
import { closeCurrentModal, currentModal } from '$packages/modal/index.svelte'
import { fade, scale } from 'svelte/transition'
import ModalConfirm from '$components/modals/ModalConfirm.svelte'
import ModalTheme from '$components/modals/ModalTheme.svelte'
import ModalReleases from '$components/modals/ModalReleases.svelte'

function cancelModal() {
  currentModal.value?.onCancel?.()
  closeCurrentModal()
}
</script>

<div
  class="w-screen h-screen bg-background/10 backdrop-blur-md z-50 fixed top-0 left-0 cursor-default" onclick={cancelModal} onkeypress={cancelModal} role="button"
  tabindex="0"
  transition:fade={{ duration: 150 }}
></div>

<div
  class:!p-0={currentModal.value?.noPadding}
  class="flex flex-col bg-background rounded-md border-2 border-background-alt absolute
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 px-4 pt-2 pb-4"
  in:scale={{ delay: 150 }} out:scale
>
  {#if currentModal.value?.type === 'confirm'}
    <ModalConfirm {...currentModal.value} />
  {/if}
  {#if currentModal.value?.type === 'theme'}
    <ModalTheme {...currentModal.value} />
  {/if}
  {#if currentModal.value?.type === 'releases'}
    <ModalReleases {...currentModal.value} />
  {/if}
</div>
