<script lang="ts" setup>
import { ref } from "vue";
import { useContactsStore } from "../service/api";
interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

let props = defineProps({
  editContact: Object as () => Contact,
});

const contactStore = useContactsStore();

let editingContact = ref({ ...props.editContact });
</script>

<template>
  <form class="modal">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="editingContact.name" />
    <label for="email">Email:</label>
    <input type="text" id="email" v-model="editingContact.email" />
    <label for="phone">Phone:</label>
    <input type="text" id="phone" v-model="editingContact.phone" />
    <input
      type="submit"
      placeholder="Отправить"
      @click.prevent="contactStore.saveEditedContact(editingContact)"
    />
  </form>
</template>

<style scoped>
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 2px solid black;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

input {
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

button {
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  padding: 10px;
  width: 50%;
  cursor: pointer;
}
</style>
