<script setup lang="ts">
import { ref } from "vue";
import { setContact } from "../service/api";
const isFormHide = ref<boolean>(false);
const name = ref<string>();
const email = ref<string>();
const phone = ref<number>();
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
    <input type="submit" value="Отправить" @click="" />
  </form>
</template>

<style scoped>
.hide {
  display: none;
}
</style>
