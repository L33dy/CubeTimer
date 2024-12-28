<script lang="ts">
import { closeCurrentModal, currentModal } from '$lib/modal'
import { fade, scale } from 'svelte/transition'
import ModalConfirm from '$lib/components/modals/ModalConfirm.svelte'

function cancelModal() {
  $currentModal?.onCancel?.()
  closeCurrentModal()
}
</script>

<div
  class="w-screen h-screen bg-gray-100/10 backdrop-blur-md z-50 fixed top-0 left-0 cursor-default" onclick={cancelModal} onkeypress={cancelModal} role="button"
  tabindex="0"
  transition:fade={{ duration: 150 }}
></div>

<div
  class="flex flex-col bg-white rounded-md border-1 border-gray-200 absolute
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 px-4 pt-2 pb-4" in:scale={{ delay: 150 }} out:scale
>
  {#if $currentModal?.type === 'confirm'}
    <ModalConfirm modal={$currentModal}/>
  {/if}
</div>
