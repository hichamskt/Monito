const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewDog} = require("../controllers/dogController")



const router = express.Router();

router.route('/addnewdog').post(upload.array('images', 10), addNewDog); 


module.exports = router ;