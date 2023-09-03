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

function sendEditContact(editingContact: Contact) {
  if (editingContact === undefined) {
    editingContact = {
      id: "string",
      name: "string",
      phone: "string",
      email: "string",
    };
  } else {
    contactStore.saveEditedContact(editingContact);
  }
}
</script>

<template>
  <form class="modal">
    <span class="close">&times;</span>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="editingContact.name" />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="editingContact.email" />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input type="text" id="phone" v-model="editingContact.phone" />
    </div>
    <input
      type="submit"
      placeholder="Отправить"
      @click.prevent="sendEditContact(editingContact)"
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
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.close {
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

input {
  border-radius: 8px;
  margin: 10px 0;
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
