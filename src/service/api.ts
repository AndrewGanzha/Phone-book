interface Contact {
  name: string;
  phone: number;
  email: string;
}

// Создание пустой базы данных для будущей работы
function createContactDataBase() {
  let contacts = localStorage.getItem("contactDB");
  if (contacts === null) {
    let contactDB: { contact: Contact[] } = { contact: [] };
    let stringContactDB = JSON.stringify(contactDB);
    localStorage.setItem("contactDB", stringContactDB);
  }
}
// Получение всех контактов из базы данных
export function getAllContacts() {
  let contactDataBaseString = localStorage.getItem("contactDB");
  let contactDataBase = JSON.parse(contactDataBaseString!);
}
// Добавление нового контакта в БД
export function setContact({ name, phone, email }: Contact) {
  let contacts = localStorage.getItem("contactDB");
  const contactsArray = contacts ? JSON.parse(contacts) : [];
  let newContact = { name: name, phone: phone, email: email };
  contactsArray.push(newContact);
  const updateContact = JSON.stringify(contactsArray);
  console.log(updateContact);
  localStorage.setItem("contactDB", updateContact);
}

createContactDataBase();
