<script lang="ts">
    import type {ConfirmModal} from "$lib/modal/types/confirm";
    import CTButton from "$lib/components/cubetime/CTButton.svelte";
    import {closeCurrentModal} from "$lib/modal";

    export let modal: ConfirmModal

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
        <p class="text-sm text-gray-600">
            {modal.description}
        </p>
    </div>
    <div class="flex justify-end items-center gap-2">
        <CTButton on:click={confirm} color="green">
            Confirm
        </CTButton>
        <CTButton on:click={cancel} color="red">
            Cancel
        </CTButton>
    </div>
</div>
