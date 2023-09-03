<script setup lang="ts">
import { useContactsStore } from "../service/api";
import eventBus from "../service/eventBus";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import EditContactForm from "../components/UIEditContactForm.vue";

const contactsStore = useContactsStore();
const searchQuery = ref("");

onMounted(() => {
  eventBus.on("contacts-updated", handleContactsUpdated);
  eventBus.on("contacts-cleared", clearContacts);
});

onBeforeUnmount(() => {
  eventBus.off("contacts-updated", handleContactsUpdated);
  eventBus.off("contacts-cleared", clearContacts);
});

const searchResults = computed(() => {
  if (searchQuery.value.trim() === "") {
    return contactsStore.reactiveContacts;
  } else {
    return contactsStore.searchContacts(searchQuery.value);
  }
});

function handleContactsUpdated() {}

function clearContacts() {}
</script>

<template>
  <input v-model="searchQuery" placeholder="Поиск контакта..." />
  <ul>
    <li v-for="contact in searchResults" :key="contact.id">
      <div class="text">
        <h2>{{ contact.name }}</h2>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
      </div>
      <div>
        <button @click="contactsStore.removeContact(contact.id)">
          Удалить контакт
        </button>
        <button @click="contactsStore.openEditModal(contact)">
          Редактировать контакт
        </button>
      </div>
    </li>
  </ul>
  <EditContactForm
    :editContact="contactsStore.editingContact"
    v-if="contactsStore.editingContact !== null"
  />
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
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  .text {
    flex-direction: column;
  }
}

button {
  display: block;
  margin: 10px auto;
  width: 80%;
}

input {
  display: block;
  width: 50%;
  margin: 20px auto;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}
</style>
