import { createApp } from "vue";
import "./style.css";
import "./service/api";
import App from "./App.vue";
import Header from "./components/UIHeader.vue";
import ContactList from "./views/ContactsList.vue";

const app = createApp(App);
app
  .component("HeaderUI", Header)
  .component("ContactList", ContactList)
  .mount("#app");
