// routes kon kon se hain
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {registerController,loginController} = require('../controllers/auth.controller');

/*
POST /register
POST /Login
GET /user [protected]
*/

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;