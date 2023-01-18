const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data.toString());
      return contacts;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getContactById = async contactId => {
    try {
      const contacts = await listContacts();
      const contact = contacts.find(contact => {
        return contact.id === contactId;
      });
      return contact ? contact : null;
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeContact = async contactId => {
    try {
      const contacts = await listContacts();
      const index = contacts.findIndex(contact => contact.id === contactId);
      const deletedContact = contacts[index];
      if (index !== -1) {
        contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
      }
      return deletedContact ? deletedContact : null;
    } catch (error) {
      console.log(error);
    }
  };
  
  const addContact = async (name, email, phone) => {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };
  
    try {
      const contacts = await listContacts();
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log(newContact);
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };