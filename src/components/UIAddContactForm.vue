<script setup lang="ts">
import { ref } from "vue";
import { useContactsStore } from "../service/api";
const contactStore = useContactsStore();
const isFormHide = ref<boolean>(false);
let id = ref<string>("");
let name = ref<string>("");
let email = ref<string>("");
let phone = ref<string>('');
</script>

<template>
  <button @click="isFormHide = !isFormHide">Добавить контакт</button>
  <form id="myForm" :class="{ hide: isFormHide }">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" required v-model="name" />
    <br />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required v-model="email" />
    <br />
    <label for="phone">Телефон:</label>
    <input type="number" id="phone" name="phone" required v-model="phone" />
    <br />
    <input
      type="submit"
      value="Отправить"
      @click.prevent="contactStore.addContact({ id, name, email, phone })"
    />
  </form>
</template>

<style scoped>
* {
  font-size: 18px;
}

button {
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  padding: 10px;
  width: 50%;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

label {
  width: 50%;
}

input {
  width: 50%;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}
.hide {
  display: none;
}
</style>
