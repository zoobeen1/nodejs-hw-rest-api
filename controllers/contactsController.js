const uuid = require('uuid').v4;

const { catchAsync } = require('../utils');

const { Contact } = require('../models');

exports.getContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});
exports.getContactById = (req, res) => {
  // const { contact } = req;
  // res.json(contact);
};
exports.addContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.contact);
  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  // const { contact } = req;
  // // const contacts = await dataBase.getContacts();
  // const updatedContact = { ...contact, ...req.body };
  // // const newContacts = contacts.map((item) => {
  //   if (item.id === contact.id) {
  //     return updatedContact;
  //   }
  //   return item;
  // });
  // // await dataBase.writeContacts(newContacts);
  // res.json(updatedContact);
});

exports.removeContact = catchAsync(async (req, res) => {
  // const contacts = await dataBase.getContacts();
  // const { contact } = req;
  // const filteredContacts = contacts.filter((item) => item.id !== contact.id);
  // await dataBase.writeContacts(filteredContacts);
  // res.status(200).json({ message: 'contact deleted' });
});
