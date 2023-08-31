import { defineStore } from "pinia";
import eventBus from "./eventBus";
//Определение интерфейса для базы данных
interface Contact {
  id: string;
  name: string;
  phone: number;
  email: string;
}
//Установка store pinia
export const useContactsStore = defineStore("contactDB", {
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contactDB") || "[]"),
  }),
  getters: {
    reactiveContacts: (state) => state.contacts,
  },
  actions: {
    //Обеспечение реактивности БД в компоненте
    updateContacts(newContacts: Contact) {
      this.contacts = newContacts;
      localStorage.setItem("contactDB", JSON.stringify(newContacts));
    },
    //Методы работы с БД: добавление, удаление, поиск
    addContact({ name, phone, email }: Contact) {
      let newContact = {
        id: crypto.randomUUID(),
        name: name,
        phone: phone,
        email: email,
      };
      this.contacts.push(newContact);
      const updateContact = JSON.stringify(this.contacts);
      localStorage.setItem("contactDB", updateContact);
      eventBus.emit("contacts-updated");
    },
    removeContact(id: string) {
      const index = this.contacts.findIndex(
        (contact: Contact) => contact.id == id
      );
      if (index !== -1) {
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
    },
    //Редактирование элемента
    updateContact({ id, name, phone, email }: Contact) {
      const index = this.contacts.findIndex(
        (contact: Contact) => contact.id === id
      );
      if (index !== -1) {
        const updatedContact = {
          id: id,
          name: name,
          phone: phone,
          email: email,
        };
        this.contacts[index] = updatedContact;
        this.updateContacts(this.contacts);
      }
    },
  },
});
