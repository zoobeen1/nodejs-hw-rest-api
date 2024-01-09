const { Types } = require('mongoose');
const { catchAsync, httpError } = require('../utils');
const { contactsValidators } = require('../validators');
const { Contact } = require('../models');

exports.checkBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) {
    next(httpError(400, 'Missing body'));
  }

  const check = bodyKeys.map((item) => {
    if (item === 'name' || item === 'email' || item === 'phone') {
      return true;
    }
    return false;
  });
  if (check.includes(false)) next(httpError(400, 'Vrong fields'));
  next();
};

exports.checkFavoriteBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) next(httpError(400, 'Missing body'));
  if (bodyKeys.length > 1) next(httpError(400, 'Vrong body'));

  const check = bodyKeys.map((item) => {
    if (item === 'favorite') return true;
    return false;
  });
  if (check.includes(false)) {
    next(httpError(400, 'Missing field favorite'));
  }
  next();
};

exports.checkAddContactData = catchAsync(async (req, res, next) => {
  const { value, error } = contactsValidators.createContactValidator(
    req.body
  );
  if (error) {
    next(httpError(400, `missing required field: ${error.message}`));
  }
  const contactExist = await Contact.exists({ email: value.email });
  if (contactExist) {
    next(
      httpError(409, `Contact with email ${value.email} is exist!`)
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
    next(httpError(404, 'Contact not found'));
  }
  const contactExist = await Contact.exists({ _id: id });
  if (!contactExist) {
    next(httpError(404, 'Contact not found'));
  }
  const contact = await Contact.findOne({ _id: id, owner }, '-owner');
  if (!contact) {
    next(httpError(403, 'Contact not found'));
  }
  req.contact = contact;
  next();
});
