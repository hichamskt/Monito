const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewCat , getAllCats ,getCatById , deleteCatById , updateCat } = require("../controllers/catController")



const router = express.Router();

router.route('/addnewcat').post(upload.array('images', 10), addNewCat); 
router.route('/getcats').get( getAllCats); 
router.route('/getcatbyid').get(getCatById); 
router.route('/deletcatbyid').delete(deleteCatById); 
router.route('/updatcat').post(upload.array('images', 10),updateCat); 


module.exports = router ;