import { defineStore } from "pinia";
import eventBus from "./eventBus";

interface Contact {
  name: string;
  phone: number;
  email: string;
}

// Создание пустой базы данных для будущей работы
function createContactDataBase() {
  let contacts = localStorage.getItem("contactDB") || [];
  if (contacts.length === 0) {
    let contactDB: Contact = [];
    let stringContactDB = JSON.stringify(contactDB);
    localStorage.setItem("contactDB", stringContactDB);
  }
}

export const useContactsStore = defineStore("contactDB", {
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contactDB")) || [],
  }),
  getters: {
    reactiveContacts: (state) => state.contacts,
  },
  actions: {
    // Получение всех контактов из базы данных
    getAllContacts() {
      let contactDataBaseString = localStorage.getItem("contactDB");
      let contactDataBase = JSON.parse(contactDataBaseString!);
      return contactDataBase;
    },
    setContact({ name, phone, email }: Contact) {
      let newContact = { name: name, phone: phone, email: email };
      this.contacts.push(newContact);
      const updateContact = JSON.stringify(this.contacts);
      localStorage.setItem("contactDB", updateContact);
      eventBus.emit("contacts-updated");
    },
    clearContacts() {
      const clearContacts = (this.contacts = []);
      const updateContact = JSON.stringify(clearContacts);
      localStorage.setItem("contactDB", updateContact);
      eventBus.emit("contacts-updated");
    },
  },
});

// Добавление нового контакта в БД
createContactDataBase();
