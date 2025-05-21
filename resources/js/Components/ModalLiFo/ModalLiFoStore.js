import { defineStore } from "pinia"

export const useModalLiFoStore = defineStore("ModalLiFo", {
    state: () => ({
        stack: [],
    }),
    actions: {
        // closeOnOutClick and closeOnEscape are reserved props. Their default value is true.
        addToStack(id, component, props = {}) {
            if (!id) id = location.protocol === 'https:' ? crypto.randomUUID() : 'x' + Date.now() + parseInt(Math.random() * (9999999 - 1000000) + 1000000)
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
