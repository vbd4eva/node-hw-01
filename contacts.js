const fs = require("fs").promises;

const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const contactList = await listContacts();
    const contact = contactList.find(({ id }) => id == contactId);
    if (!contact)
      throw new Error(`Contact with id: ${contactId}, is not found.`);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function updateById(contactId, UpdatedObj) {
  if (!contactId || UpdatedObj?.constructor !== Object) {
    throw new Error(
      `Given wrong arguments to updateById(${contactId}, ${UpdatedObj})`
    );
  }
  const UpdatedData = { ...UpdatedObj };
  delete UpdatedData.id;

  try {
    const contactList = await listContacts();

    const idx = contactList.findIndex(({ id }) => id === contactId);
    if (!~idx) throw new Error(`Contact with id = ${contactId} is not found`);

    const contact = contactList[idx];

    const propsKeysToUpdate = Object.keys(UpdatedData).filter(
      (key) => !!contact[key]
    );
    if (propsKeysToUpdate.length <= 0) {
      console.error(`Contact data with id = ${contactId} not updated`);
      return;
    }

    const dataToUpdateObj = propsKeysToUpdate.reduce((acc, key) => {
      acc[key] = UpdatedData[key];
      return acc;
    }, {});

    const updatedContact = { ...contact, ...dataToUpdateObj };
    contactList[idx] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contactList));

    return contactList[idx];
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  if (!contactId) return false;
  // ...твой код
  try {
    const contactsList = await listContacts();
    let deletedContact = {};
    const updatedContactsList = contactsList.filter((contactObject) => {
      if (contactObject.id != contactId) {
        return true;
      }
      deletedContact = { ...contactObject };
    });

    if (Object.keys(deletedContact).length <= 0)
      throw new Error(`Contact with id = ${contactId} not found`);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));

    return deletedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  if (!name || !email || !phone) {
    throw new Error(
      `Not valid arguments for function addContact(${name}, ${email}, ${phone})`
    );
  }

  try {
    const contactsList = await listContacts();
    const id = nanoid();
    contactsList.push({ id, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return id;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  updateById,
  removeContact,
  addContact,
};
