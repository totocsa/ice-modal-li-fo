import { defineStore } from "pinia"

export const useModalLiFoStore = defineStore("ModalLiFo", {
    state: () => ({
        stack: [],
    }),
    actions: {
        addToStack(id, component, props = {}) {
            if (!id) id = location.protocol === 'https:' ? crypto.randomUUID() : 'x' + Date.now()
            this.stack.push({ id: id, component: component, props: props })
        },
        removeById(id) {
            this.stack = this.stack.filter((item) => item.id !== id)
        },
        removeLast() {
            this.stack.pop()
        },
    },
})
