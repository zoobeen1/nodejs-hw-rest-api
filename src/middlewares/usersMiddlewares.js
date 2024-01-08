const { Types } = require('mongoose');
const { catchAsync, httpError } = require('../utils');
const { usersValidators } = require('../validators');
const { userService, ImageService } = require('../services');
const { User } = require('../models');
// const multer = require('multer');

exports.checkAddUser = catchAsync(async (req, res, next) => {
  const { value, error } = usersValidators.createUserDataValidator(
    req.body
  );
  if (error) {
    next(
      httpError(400, `Missing required field: ${error.message}..`)
    );
  }

  if (await User.exists({ email: value.email })) {
    next(httpError(409, `Email ${value.email} in use!`));
  }
  req.user = value;
  next();
});

exports.checkLoginUser = catchAsync(async (req, res, next) => {
  const { value, error } = usersValidators.createUserDataValidator(
    req.body
  );
  if (error) {
    next(httpError(400, 'Email or password is wrong'));
  }

  const user = await userService.loginUser(value.email);

  // check user email exist and password is valid
  if (!user || !(await user.checkPassword(value.password))) {
    next(httpError(401, 'Email or password is wrong'));
  }
  req.user = user;
  next();
});

exports.authenticate = catchAsync(async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(httpError(401, 'Authorization error...'));
  }
  const result = userService.tokenVerify(token);
  if (!result) {
    next(httpError(401, 'Authorization error...'));
  }
  const user = await User.findById(result.id);
  if (!user) {
    next(httpError(401, 'Authorization error...'));
  }
  if (user.token !== token) {
    next(httpError(403, 'Authorization error...'));
  }
  req.user = user;
  next();
});

exports.checkId = catchAsync(async (req, res, next) => {
  const id = req.params.userId;

  const isIdValid = Types.ObjectId.isValid(id);
  if (!isIdValid) {
    next(httpError(404, 'Not found'));
  }
  const userExist = await User.exists({ _id: id });
  if (!userExist) {
    next(httpError(404, 'Not found'));
  }
  next();
});
/*
// simple multer ***********
// config storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, 'public/avatars');
  },
  filename: (req, file, cbk) => {
    const extension = file.mimetype.split('/')[1];
    cbk(null, `${req.user.id}.${extension}`);
  },
});
// config filter
const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith('image/')) {
    cbk(null, true);
  } else cbk(httpError(400, 'Images only!!!'));
};

exports.uploadUserAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single('avatar');
// /*************************** */
exports.uploadUserAvatar = ImageService.initUploadImage('avatar');
