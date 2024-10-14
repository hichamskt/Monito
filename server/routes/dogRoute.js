const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewDog ,getAllDogs,getDogById} = require("../controllers/dogController")



const router = express.Router();

router.route('/addnewdog').post(upload.array('images', 10), addNewDog); 
router.route('/getdogs').get( getAllDogs); 
router.route('/getdogbyid').get(getDogById); 


module.exports = router ;