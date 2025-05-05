<script lang="ts">
import type { ConfirmModal } from '$packages/modal/types'
import CTButton from '$lib/components/cubetime/CTButton.svelte'
import { closeCurrentModal } from '$packages/modal/index.svelte'

let modal: ConfirmModal = $props()

function confirm() {
  modal?.onConfirm?.()

  closeCurrentModal()
}

function cancel() {
  modal?.onCancel?.()

  closeCurrentModal()
}
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h2 class="font-medium">
      {modal.title}
    </h2>
    <p class="text-sm text-text-alt">
      {modal.description}
    </p>
  </div>
  <div class="flex justify-end items-center gap-2">
    <CTButton onclick={confirm}>
      Confirm
    </CTButton>
    <CTButton onclick={cancel} color="red">
      Cancel
    </CTButton>
  </div>
</div>
