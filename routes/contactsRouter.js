const express = require('express');

const contactsController = require('../controllers');
const contactsMiddlewares = require('../middlewares');

const router = express.Router();

// CRUD
// contactsMiddlewares.checkFullBody,
router
  .route('/')
  .post(contactsMiddlewares.checkAddContactData, contactsController.addContact)
  .get(contactsController.getContacts);
// router.use('/:contactId', contactsMiddlewares.checkId);
router
  .route('/:contactId')
  .get(contactsController.getContactById)
  .put(contactsMiddlewares.checkBody, contactsController.updateContact)
  .delete(contactsController.removeContact);

module.exports = router;
