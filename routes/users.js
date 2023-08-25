const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserValidation } = require('../utils/validation');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUserInfo);

module.exports = router;
