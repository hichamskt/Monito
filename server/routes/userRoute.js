

const express = require('express');
const {  login ,logout ,register,sendEmail,resetPassword } = require ("../controllers/userController.js");


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/logout').post(logout);
router.route('/sendemail').post(sendEmail);
router.route('/:userId/resetPassword').post(resetPassword);



module.exports = router ;
