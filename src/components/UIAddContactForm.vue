<script setup lang="ts">
import { ref } from "vue";
import { useContactsStore } from "../service/api";
const contactStore = useContactsStore();
const isFormHide = ref<boolean>(true);
let id = ref<string>("");
let name = ref<string>("");
let email = ref<string>("");
let phone = ref<string>("");

function addContact(name: string, email: string, phone: string, id: string) {
  if (name.length < 3) {
    alert("Введите корректные данные! Имя - минимум 3 символа");
    return;
  }
  if (email.length < 5) {
    alert("Введите корректные данные! Email - минимум 5 символов");
    return;
  }
  if (phone.length < 6) {
    alert("Введите корректные данные! Телефон - минимум 6 символов");
    return;
  }

  contactStore.addContact({ id, name, email, phone });
  clearForm();
}

function clearForm() {
  name.value = "";
  email.value = "";
  phone.value = "";
}
</script>

<template>
  <button @click="isFormHide = !isFormHide">Добавить контакт</button>
  <form id="myForm" :class="{ hide: isFormHide }">
    <label for="name">Имя:</label>
    <input
      type="text"
      autocomplete="off"
      id="name"
      name="name"
      required
      v-model="name"
    />
    <br />
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      v-model="email"
      autocomplete="off"
    />
    <br />
    <label for="phone">Телефон:</label>
    <input
      type="number"
      id="phone"
      name="phone"
      required
      v-model="phone"
      autocomplete="off"
    />
    <br />
    <input
      type="reset"
      value="Отправить"
      @click.prevent="addContact(name, email, phone, id)"
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

@media (max-width: 599px) {
  label {
    width: 300px;
  }

  input {
    width: 300px;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
