const express = require('express');

const { usersController } = require('../controllers');
const { usersMiddlewares } = require('../middlewares');

const router = express.Router();

// CRUD

router
  .route('/register')
  .post(usersMiddlewares.checkAddUserData, usersController.addUser);

router.route('/login').post();

router.route('/logout').post();

router.route('/current').get();

module.exports = router;
