const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductPage, getEditProductPage, postEditProductPage, postDeleteProductPage } = require('../controllers/admin/ProductController.js');
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({
    storage: storage
  });


router.get('/', getAdminProductPage);

router.get('/add', getAddProductPage);

router.post('/add',upload.single('image'), postAddProductPage);

router.get('/edit/:productId', getEditProductPage);

router.post('/edit', postEditProductPage);

router.post('/delete', postDeleteProductPage);


// router.get('/users',(req, res, next)=>{
//     const viewsdata = {
//         pageTitle: 'User Page',
//     }
//     res.render('user', viewsdata);
// });

module.exports = router;