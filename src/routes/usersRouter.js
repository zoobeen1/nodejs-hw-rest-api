const express = require('express');

const { usersController } = require('../controllers');
const { usersMiddlewares } = require('../middlewares');

const router = express.Router();

// CRUD

router.post(
  '/register',
  usersMiddlewares.checkAddUser,
  usersController.add
);

router.post(
  '/login',
  usersMiddlewares.checkLoginUser,
  usersController.login
);

router.post(
  '/logout',
  usersMiddlewares.authenticate,
  usersController.logout
);

router.get(
  '/current',
  usersMiddlewares.authenticate,
  usersController.current
);
router.patch(
  '/avatars',
  usersMiddlewares.authenticate,
  usersMiddlewares.uploadUserAvatar,
  usersController.avatar
);
router.get(
  '/verify/:verificationToken',
  usersController.verification
);
router.post(
  '/verify/',
  usersMiddlewares.checkResendEmailData,
  usersController.resendEmail
);

module.exports = router;
