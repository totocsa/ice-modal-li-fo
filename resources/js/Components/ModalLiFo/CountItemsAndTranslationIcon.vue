<script setup>
import { useModalLiFoStore } from "./ModalLiFoStore.js"
import { useTranslationStore } from "@IceDatabaseTranslationLocally/Components/LocalTranslation/translationStore"
import { LanguageIcon } from '@heroicons/vue/20/solid'
</script>

<template>
    <div class="inline-flex items-center justify-center text-[75%]">
        <LanguageIcon
            class="bg-indigo-700 border-2 border-fuchsia-500 border-solid cursor-pointer inline-block rounded-md text-gray-200 w-5"
            @click="useTranslationStore().toggleIsIcons()" />

        <div class="pl-2 pr-2">
            {{ useModalLiFoStore().stack.length }}
        </div>
    </div>
</template>
