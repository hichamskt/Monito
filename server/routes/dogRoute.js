const upload = require('../middlewares/multerConfig');
const {addNewDog} = require("../controllers/dogController")

const express = require('express');


const router = express.Router();

router.route('/addnewdog').post(upload.array('dogImages', 10), addNewDog); 


module.exports = router ;