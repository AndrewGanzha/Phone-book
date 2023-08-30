// Создание пустой базы данных для будущей работы
let contactDB = { contacts: [] };
let stringContactDB = JSON.stringify(contactDB);
localStorage.setItem("contactDB", stringContactDB);
