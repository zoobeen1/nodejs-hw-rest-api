const { Types } = require('mongoose');
const { catchAsync, HttpError } = require('../utils');
const { usersValidators } = require('../validators');
const { User } = require('../models');

exports.checkAddUserData = catchAsync(async (req, res, next) => {
  const { value, error } = usersValidators.createUserValidator(req.body);
  if (error) {
    throw new HttpError(400, `missing required field: ${error.message}`);
  }
  const userExist = await User.exists({ email: value.email });
  if (userExist) {
    throw new HttpError(409, `User with email ${value.email} is exist!`);
  }
  req.user = value;
  next();
});

exports.checkId = catchAsync(async (req, res, next) => {
  const id = req.params.userId;

  const isIdValid = Types.ObjectId.isValid(id);
  if (!isIdValid) {
    throw new HttpError(404, 'Not found');
  }
  const userExist = await User.exists({ _id: id });
  if (!userExist) {
    throw new HttpError(404, 'Not found');
  }
  next();
});
