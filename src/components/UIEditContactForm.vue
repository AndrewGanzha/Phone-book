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
  <form @submit.prevent="">
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
    <div>
      <input
        type="submit"
        placeholder="Отправить"
        @click.prevent="contactStore.saveEditedContact(editingContact)"
      />
    </div>
  </form>
</template>

<style scoped>
.hide {
  display: none;
}
</style>
