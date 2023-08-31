import { createApp } from "vue";
import "./style.css";
import "./service/api";
import App from "./App.vue";
import Header from "./components/UIHeader.vue";
import ContactList from "./views/Contacts.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app
  .component("HeaderUI", Header)
  .component("ContactList", ContactList)
  .use(pinia)
  .mount("#app");
