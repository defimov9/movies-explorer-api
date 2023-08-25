const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../utils/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

module.exports = router;
