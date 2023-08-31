<script setup lang="ts">
import { useContactsStore } from "../service/api";
import { ref, onMounted, onBeforeUnmount } from "vue";
import eventBus from "../service/eventBus";

const contactsStore = useContactsStore();
let contacts = ref(contactsStore.reactiveContacts);

onMounted(() => {
  eventBus.on("contacts-updated", handleContactsUpdated);
  eventBus.on("contacts-cleared", clearContacts);
});

onBeforeUnmount(() => {
  eventBus.off("contacts-updated", handleContactsUpdated);
  eventBus.off("contacts-cleared", clearContacts);
});

function handleContactsUpdated() {}

function clearContacts() {}
</script>

<template>
  <ul>
    <li v-for="(contact, index) in contacts" :key="index">
      <div class="text">
        <h2>{{ contact.name }}</h2>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
        <button @click="contactsStore.removeContact(index)">
          Удалить контакт
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

li {
  padding: 10px;
  border: 2px solid gray;
  display: flex;
  text-align: center;
  .text {
    flex-direction: column;
  }
}

button {
  display: block;
  margin: 10px auto;
  width: 80%;
}
</style>
