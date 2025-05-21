<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import { TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalLiFoStore } from './ModalLiFoStore.js'

const refModalLiFo = ref(null)
const store = useModalLiFoStore()

const getInitialFocus = (itemId) => {
    const root = document.getElementById(`component-${itemId}`)
    const el = root?.querySelector('input, select, textarea') ?? false
    return el
}

const handleClick = (event) => {
    if (store.stack.at(-1).props.closeOnOutClick ?? true) {
        store.removeLast()
    }
}

const handleKeydown = (event) => {
    if (store.stack.length > 0 &&
        (store.stack.at(-1).props.closeOnEscape ?? true) &&
        event.key === "Escape") {
        store.removeLast()
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
    <div v-if="store.stack.length > 0" @click.self.stop.prevent="handleClick" ref="refModalLiFo"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">

        <div v-for="(item, index) in store.stack" :key="item.id" :style="{ zIndex: 200 + index }"
            v-show="index === store.stack.length - 1" class="absolute top-4">

            <TransitionRoot :show="index === store.stack.length - 1" as="template">
                <TransitionChild as="div" enter="transition ease-out duration-2000" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition ease-in duration-3000" leave-from="opacity-100"
                    leave-to="opacity-0">

                    <focus-trap :active="index === store.stack.length - 1"
                        :initialFocus="() => getInitialFocus(item.id)" :fallbackFocus="() => refModalLiFo">

                        <component v-if="item.component" :is="item.component" v-bind="item.props"
                            :id="`component-${item.id}`" class="relative" />

                    </focus-trap>
                </TransitionChild>
            </TransitionRoot>
        </div>
    </div>
</template>
