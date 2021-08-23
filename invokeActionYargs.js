const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

// TODO: рефакторить;
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      getContactById(id).then(console.table);
      break;

    case "add":
      addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      removeContact(id).then(console.table);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

module.exports = invokeAction;
