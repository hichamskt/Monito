

const express = require('express');
const {  login ,logout  } = require ("../controllers/userController.js");


const router = express.Router();


router.route('/login').post(login);

router.route('/logout').post(logout);



module.exports = router ;
