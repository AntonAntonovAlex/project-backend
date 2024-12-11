const express = require('express');
const { register, login, getAllUsers } = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');


router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, getAllUsers);

module.exports = router;
