import { defineStore } from "pinia";
import eventBus from "./eventBus";

interface Contact {
  name: string;
  phone: number;
  email: string;
}

export const useContactsStore = defineStore("contactDB", {
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contactDB")) || [],
  }),
  getters: {
    reactiveContacts: (state) => state.contacts,
  },
  actions: {
    updateContacts(newContacts) {
      this.contacts = newContacts;
      localStorage.setItem("contactDB", JSON.stringify(newContacts));
    },
    setContact({ name, phone, email }: Contact) {
      let newContact = { name: name, phone: phone, email: email };
      this.contacts.push(newContact);
      const updateContact = JSON.stringify(this.contacts);
      localStorage.setItem("contactDB", updateContact);
      eventBus.emit("contacts-updated");
    },
    removeContact(index) {
      this.contacts.splice(index, 1);
      this.updateContacts(this.contacts);
    },
  },
});
