const express = require('express');
const { createUserInMongoAndVital } = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUserInMongoAndVital);

module.exports = router;
