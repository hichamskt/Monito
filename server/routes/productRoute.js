const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewProduct, getAllProducts , modifieProductStatus} = require("../controllers/productController")



const router = express.Router();

router.route('/addnewproduct').post(upload.array('images', 10), addNewProduct); 
router.route('/getallproducts').get( getAllProducts); 
router.route('/modifieproductstatus').post( modifieProductStatus); 
// router.route('/getdogbyid').get(getDogById); 
// router.route('/deletdogbyid').delete(deleteDogById); 
// router.route('/updatdog').post(upload.array('images', 10),updateDog); 


module.exports = router ;