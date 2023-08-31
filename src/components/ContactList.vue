<script setup lang="ts">
import { useContactsStore } from "../service/api";
import { ref, onMounted, onBeforeUnmount } from "vue";
import eventBus from "../service/eventBus";

const contactsStore = useContactsStore();
let contacts = ref(contactsStore.reactiveContacts);

onMounted(() => {
  eventBus.on("contacts-updated", handleContactsUpdated);
});

onBeforeUnmount(() => {
  eventBus.off("contacts-updated", handleContactsUpdated);
});

function handleContactsUpdated() {
  console.log("clear");
}
</script>

<template>
  <ul v-for="contact in contacts">
    <h2>{{ contact.name }}</h2>
    <p>{{ contact.email }}</p>
    <p>{{ contact.phone }}</p>
  </ul>
</template>

<style scoped></style>
