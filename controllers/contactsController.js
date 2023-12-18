const { catchAsync } = require('../utils');
const { Contact } = require('../models');

exports.getContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

exports.getContactById = catchAsync(async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  res.json(contact);
});

exports.addContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.contact);
  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedContact);
});

exports.updateStatusContact = catchAsync(async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      favorite,
    },
    { new: true }
  );
  res.json(updatedContact);
});

exports.removeContact = catchAsync(async (req, res) => {
  const id = req.params.contactId;
  await Contact.findByIdAndDelete(id);
  res.status(200).json({ message: 'Contact deleted' });
});
