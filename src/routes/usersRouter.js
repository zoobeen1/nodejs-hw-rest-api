const express = require('express');

const { usersController } = require('../controllers');
const { usersMiddlewares } = require('../middlewares');

const router = express.Router();

// CRUD

router
  .route('/register')
  .post(usersMiddlewares.checkAddUser, usersController.add);

router
  .route('/login')
  .post(usersMiddlewares.checkLoginUser, usersController.login);

router
  .route('/logout')
  .post(usersMiddlewares.authenticate, usersController.logout);

router
  .route('/current')
  .get(usersMiddlewares.authenticate, usersController.current);
router
  .route('/avatars')
  .patch(
    usersMiddlewares.authenticate,
    usersMiddlewares.uploadUserAvatar,
    usersController.avatar
  );
module.exports = router;
