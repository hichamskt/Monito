

const express = require('express');
const {  login ,logout ,register,sendEmail } = require ("../controllers/userController.js");


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/logout').post(logout);
router.route('/sendemail').post(sendEmail);



module.exports = router ;
