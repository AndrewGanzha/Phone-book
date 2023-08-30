interface Contact {
  name: string;
  email: string;
  number: number;
}

// Создание пустой базы данных для будущей работы
function createContactDataBase() {
  let contacts = localStorage.getItem("contactDB");
  console.log(contacts);
  if (contacts === null) {
    let contactDB: { contact: Contact[] } = { contact: [] };
    let stringContactDB = JSON.stringify(contactDB);
    localStorage.setItem("contactDB", stringContactDB);
  }
}
// Получение всех контактов из базы данных
function getAllContacts() {
  let contactDataBaseString = localStorage.getItem("contactDB");
  let contactDataBase = JSON.parse(contactDataBaseString!);
}
// Добавление нового контакта в БД
function setContact() {
  let contacts = localStorage.getItem("contactDB.contact");
  const contactsArray = contacts ? JSON.parse(contacts) : [];
  let newContact = { name: "Alex", age: 35, email: "123@mail.ru" };
  contactsArray.push(newContact);
  const updateContact = JSON.stringify(contactsArray);
  localStorage.setItem("contactDB", updateContact);
}
createContactDataBase();
setContact();
getAllContacts();
