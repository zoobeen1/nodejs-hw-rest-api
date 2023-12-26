const express = require('express');

const { usersController } = require('../controllers');
const { usersMiddlewares } = require('../middlewares');

const router = express.Router();

// CRUD

router
  .route('/register')
  .post(usersMiddlewares.checkAddUser, usersController.addUser);

router
  .route('/login')
  .post(usersMiddlewares.checkLoginUser, usersController.loginUser);

router.route('/logout').post();

router.route('/current').get();

module.exports = router;
