<script setup lang="ts">
import { useLocalStorageStore } from "../service/api";
import { ref } from "vue";

const localStorageStore = useLocalStorageStore();
const localStorageValue = ref(localStorageStore.localStorageValue);
</script>

<template>
  <ul>
    <li></li>
  </ul>
</template>

<style scoped></style>
