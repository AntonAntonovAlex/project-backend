const express = require('express');
const router = express.Router();
const { getAllTopics } = require('../controllers/topicController');

router.get('/topics', getAllTopics);

module.exports = router;
