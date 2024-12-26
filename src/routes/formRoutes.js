const express = require('express');
const router = express.Router();
const {
  createForm,
  getAllForms,
  getFormById,
  deleteForm,
  getFormsByTemplateId,
} = require('../controllers/formController');
const authenticate = require('../middlewares/authenticate');

router.post('/form', authenticate, createForm);
router.get('/forms', authenticate, getAllForms);
router.get('/form/:id', authenticate, getFormById);
router.delete('/form/:id', authenticate, deleteForm);
router.get('/forms/:templateId', authenticate, getFormsByTemplateId);

module.exports = router;
