<script setup>
import { useModalLiFoStore } from "@/Components/totocsa/ModalLiFo/ModalLiFoStore.js"

const props = defineProps({
    closeHandler: Function,
    closeBefore: Function,
    closeAfter: Function,
})

const closeModal = (event) => {
    if (event?.preventDefault) event.preventDefault()

    if (typeof props.closeBefore === 'function') {
        props.closeBefore(event)
    }

    useModalLiFoStore().removeLast()

    if (typeof props.closeAfter === 'function') {
        props.closeAfter(event)
    }
}

defineExpose({ closeModal })

const close = props?.closeHandler || closeModal
</script>

<template>
    <div>
        <slot />
    </div>
</template>
