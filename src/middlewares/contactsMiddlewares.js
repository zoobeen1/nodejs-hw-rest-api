const { Types } = require('mongoose');
const { catchAsync, Errors } = require('../utils');
const { contactsValidators } = require('../validators');
const { Contact } = require('../models');

const { HttpError } = Errors;

exports.checkBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) {
    throw new HttpError(400, 'missing body');
  }

  const check = bodyKeys.map((item) => {
    if (item === 'name' || item === 'email' || item === 'phone') {
      return true;
    }
    return false;
  });
  if (check.includes(false)) throw new HttpError(400, 'vrong fields');
  next();
};

exports.checkFavoriteBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) throw new HttpError(400, 'missing body');
  if (bodyKeys.length > 1) throw new HttpError(400, 'Vrong body');

  const check = bodyKeys.map((item) => {
    if (item === 'favorite') return true;
    return false;
  });
  if (check.includes(false)) {
    throw new HttpError(400, 'missing field favorite');
  }
  next();
};

exports.checkAddContactData = catchAsync(async (req, res, next) => {
  const { value, error } = contactsValidators.createContactValidator(
    req.body
  );
  if (error) {
    throw new HttpError(
      400,
      `missing required field: ${error.message}`
    );
  }
  const contactExist = await Contact.exists({ email: value.email });
  if (contactExist) {
    throw new HttpError(
      409,
      `Contact with email ${value.email} is exist!`
    );
  }
  req.contact = value;
  next();
});

exports.checkId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  const isIdValid = Types.ObjectId.isValid(id);
  if (!isIdValid) {
    throw new HttpError(404, 'Contact not found');
  }
  const contactExist = await Contact.exists({ _id: id });
  if (!contactExist) {
    throw new HttpError(404, 'Contact not found');
  }
  const contact = await Contact.findOne({ _id: id, owner }, '-owner');
  if (!contact) {
    throw new HttpError(403, 'Contact not found');
  }
  req.contact = contact;
  next();
});
