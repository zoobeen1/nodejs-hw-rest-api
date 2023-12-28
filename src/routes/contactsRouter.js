const express = require('express');

const { contactsController } = require('../controllers');
const {
  contactsMiddlewares,
  usersMiddlewares,
} = require('../middlewares');

const router = express.Router();

// CRUD
router.use('/', usersMiddlewares.authenticate);
router
  .route('/')
  .post(
    contactsMiddlewares.checkAddContactData,
    contactsController.addContact
  )
  .get(contactsController.getContacts);
router.use('/:contactId', contactsMiddlewares.checkId);
router
  .route('/:contactId')
  .get(contactsController.getContactById)
  .patch(
    contactsMiddlewares.checkBody,
    contactsController.updateContact
  )
  .delete(contactsController.removeContact);
router
  .route('/:contactId/favorite')
  .patch(
    contactsMiddlewares.checkFavoriteBody,
    contactsController.updateStatusContact
  );

module.exports = router;
