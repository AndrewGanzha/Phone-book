<script setup lang="ts">
import { ref } from "vue";
import { getAllContacts } from "../service/api";

const contactList = ref(getAllContacts());
</script>

<template>
  <ul>
    <li v-for="contact in contactList">
      {{ contact.name }}
    </li>
  </ul>
</template>

<style scoped></style>
