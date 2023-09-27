const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

router.post('/register', register);
// router.route('/register').post(register); //second version

router.post('/login', login);
// router.route('/login').post(login); //second version

module.exports = router;