const uuid = require('uuid').v4;

const { catchAsync, contactsValidators, HttpError } = require('../utils');
// const dataBase = require('../models');
const { Contact } = require('../models');

exports.listContacts = catchAsync(async (req, res) => {
  // const contacts = await dataBase.getContacts();
  // res.json(contacts);
});
exports.getContactById = (req, res) => {
  const { contact } = req;
  res.json(contact);
};
exports.addContact = catchAsync(async ({ body }, res) => {
  const { value, error } = contactsValidators.createContactValidator(body);
  if (error) {
    throw new HttpError(400, `missing required field: ${error.message}`);
  }
  const newContact = await Contact.create(value);
  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contact } = req;
  // const contacts = await dataBase.getContacts();
  const updatedContact = { ...contact, ...req.body };

  // const newContacts = contacts.map((item) => {
    if (item.id === contact.id) {
      return updatedContact;
    }
    return item;
  });
  // await dataBase.writeContacts(newContacts);
  res.json(updatedContact);
});

exports.removeContact = catchAsync(async (req, res) => {
  const contacts = await dataBase.getContacts();
  const { contact } = req;

  const filteredContacts = contacts.filter((item) => item.id !== contact.id);
  await dataBase.writeContacts(filteredContacts);
  res.status(200).json({ message: 'contact deleted' });
});
