const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

const router = express.Router();

router.post('/createProfile', ProfileController.CreateProfile);
router.post('/loginUser', ProfileController.LoginUser);
router.get('/selectProfile', AuthVerifyMiddleware, ProfileController.SelectProfile);

module.exports = router;
