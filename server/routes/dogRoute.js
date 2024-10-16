const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewDog ,getAllDogs,getDogById,deleteDogById,updateDog } = require("../controllers/dogController")



const router = express.Router();

router.route('/addnewdog').post(upload.array('images', 10), addNewDog); 
router.route('/getdogs').get( getAllDogs); 
router.route('/getdogbyid').get(getDogById); 
router.route('/deletdogbyid').delete(deleteDogById); 
router.route('/updatdog').post(upload.array('images', 10),updateDog); 


module.exports = router ;