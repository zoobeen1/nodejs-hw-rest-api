const { Types } = require('mongoose');
const { catchAsync, HttpError } = require('../utils');
const { usersValidators } = require('../validators');
const { userServices } = require('../services');
const { User } = require('../models');

exports.checkAddUser = catchAsync(async (req, res, next) => {
  const { value, error } = usersValidators.createUserDataValidator(
    req.body
  );
  if (error) {
    throw new HttpError(
      400,
      `Missing required field: ${error.message}..`
    );
  }
  const userExist = await User.exists({ email: value.email });
  if (userExist) {
    throw new HttpError(409, `Email ${value.email} in use!`);
  }
  req.user = value;
  next();
});
exports.checkLoginUser = catchAsync(async (req, res, next) => {
  const { value, error } = usersValidators.createUserDataValidator(
    req.body
  );
  if (error) {
    throw new HttpError(
      400,
      `Missing required field: ${error.message}..`
    );
  }
  // check user exist
  const userExist = await User.exists({ email: value.email });
  if (!userExist) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const user = await userServices.loginUser(value.email);
  // check password is valid
  if (!(await user.checkPassword(value.password))) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  req.user = user;
  next();
});

exports.checkToken = catchAsync(async (req, res, next) => {
  // const { value, error } = usersValidators.createUserValidator(req.body);
  // if (error) {
  //   throw new HttpError(400, `Missing required field: ${error.message}..`);
  // }
  // const userExist = await User.exists({ email: value.email });
  // if (!userExist) {
  //   throw new HttpError(401, 'Email or password is wrong');
  // }
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
