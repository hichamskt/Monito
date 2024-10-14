const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewDog ,getAllDogs} = require("../controllers/dogController")



const router = express.Router();

router.route('/addnewdog').post(upload.array('images', 10), addNewDog); 
router.route('/getdogs').post( getAllDogs); 


module.exports = router ;