const express = require('express');
const router = express.Router();
const { addComment, getCommentsByTemplateId } = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

router.post('/comments', authenticate, addComment);
router.get('/comments/:templateId', getCommentsByTemplateId);

module.exports = router;
