const { getContacts } = require('../models');
const { catchAsync, HttpError } = require('../utils');

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

exports.checkId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId;
  const contacts = await getContacts();
  const [contact] = contacts.filter((item) => item.id === id);

  // example of use custom HttpError
  if (id.length < 15) throw new HttpError(400, 'Invalid ID!');

  if (!contact) throw new HttpError(404, `Contact ID: ${id} Not found`);
  req.contact = contact;
  next();
});
