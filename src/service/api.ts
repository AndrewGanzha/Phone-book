import { defineStore } from "pinia";
import eventBus from "./eventBus";

interface Contact {
  id: string;
  name: string;
  phone: number;
  email: string;
}

export const useContactsStore = defineStore("contactDB", {
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contactDB") || "[]"),
  }),
  getters: {
    reactiveContacts: (state) => state.contacts,
  },
  actions: {
    updateContacts(newContacts: Contact) {
      this.contacts = newContacts;
      localStorage.setItem("contactDB", JSON.stringify(newContacts));
    },
    setContact({ name, phone, email }: Contact) {
      let newContact = {id: crypto.randomUUID(), name: name, phone: phone, email: email };
      this.contacts.push(newContact);
      const updateContact = JSON.stringify(this.contacts);
      localStorage.setItem("contactDB", updateContact);
      eventBus.emit("contacts-updated");
    },
    removeContact(id: string) {
      const index = this.contacts.findIndex((item: Contact) => item.id === id)
      if(index !== -1) {
        this.contacts.splice(index, 1);
        this.updateContacts(this.contacts);
      }
    },
    searchContacts(query: string) {
      query = query.toLowerCase();
      return this.contacts.filter((contact: Contact) => {
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.phone.toString().toLowerCase().includes(query)
        );
      });
    }
  },
});
