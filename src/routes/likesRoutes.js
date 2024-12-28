const express = require('express');
const router = express.Router();
const { getLikesForTemplate, toggleLike } = require('../controllers/likeController');
const authenticate = require('../middlewares/authenticate');

router.get('/likes/:templateId', getLikesForTemplate);
router.post('/likes', authenticate, toggleLike);

module.exports = router;
