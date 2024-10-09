

const express = require('express');
const {  login ,logout ,register } = require ("../controllers/userController.js");


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/logout').post(logout);



module.exports = router ;
