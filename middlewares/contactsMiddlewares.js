const { catchAsync, HttpError, contactsValidators } = require('../utils');
const { Contact } = require('../models');

exports.checkBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) throw new HttpError(400, 'missing body');

  const check = bodyKeys.map((item) => {
    if (item === 'name' || item === 'email' || item === 'phone') return true;
    return false;
  });
  if (check.includes(false)) throw new HttpError(400, 'vrong fields');
  next();
};

exports.checkAddContactData = catchAsync(async (req, res, next) => {
  const { value, error } = contactsValidators.createContactValidator(req.body);
  if (error) {
    throw new HttpError(400, `missing required field: ${error.message}`);
  }
  const contactExist = await Contact.exists({ email: value.email });
  if (contactExist) {
    throw new HttpError(409, `Contact with email ${value.email} is exist!`);
  }
  req.contact = value;
  next();
});
