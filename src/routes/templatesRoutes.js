const express = require('express');
const router = express.Router();
const {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
    getLatestTemplates,
    getMostPopularTemplates,
 } = require('../controllers/templateController');
const authenticate = require('../middlewares/authenticate');

router.post('/template/create', authenticate, createTemplate);
router.get('/template', getAllTemplates);
router.get('/template/:id', getTemplateById);
router.put('/template/:id', authenticate, updateTemplate);
router.delete('/template/:id', authenticate, deleteTemplate);
router.get('/templates/latest', getLatestTemplates);
router.get('/templates/popular', getMostPopularTemplates);

module.exports = router;
