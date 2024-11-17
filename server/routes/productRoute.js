const express = require('express');
const upload = require('../middlewares/multerConfig');
const {addNewProduct, getAllProducts , modifieProductStatus, updateProduct , deleteProductById , getProductById} = require("../controllers/productController")



const router = express.Router();

router.route('/addnewproduct').post(upload.array('images', 10), addNewProduct); 
router.route('/getallproducts').get( getAllProducts); 
router.route('/modifieproductstatus').post( modifieProductStatus); 
router.route('/getproductbyid/:productid').get(getProductById); 
router.route('/deletproductbyid').delete(deleteProductById); 
router.route('/updatproduct').post(upload.array('images', 10),updateProduct); 


module.exports = router ;