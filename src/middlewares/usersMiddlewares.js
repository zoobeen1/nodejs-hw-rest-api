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

  if (await User.exists({ email: value.email })) {
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
    throw new HttpError(400, 'Email or password is wrong');
  }

  const user = await userServices.loginUser(value.email);
  // check user email exist and password is valid
  if (!user || !(await user.checkPassword(value.password))) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  req.user = user;
  next();
});

exports.authenticate = catchAsync(async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw new HttpError(401, 'Authorization error...');
  }
  const { id } = userServices.tokenVerify(token);
  if (!id) {
    throw new HttpError(401, 'Authorization error...');
  }
  const user = await User.findById(id);
  if (!user) {
    throw new HttpError(401, 'Authorization error...');
  }
  req.user = user;
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
