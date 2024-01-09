const { catchAsync } = require('../utils');
const { Contact } = require('../models');

exports.getContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find(
    { owner },
    '-owner -createdAt -updatedAt'
  );
  res.json(contacts);
});

exports.getContactById = (req, res) => {
  // find is in midleware
  res.json(req.contact);
};

exports.addContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.contact, owner });
  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
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
