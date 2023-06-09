const express = require('express');

const route = express.Router();
const extraCategoryController = require('../controller/extracategoryController');
route.get('/add_extracategory', extraCategoryController.addExtracategory);

route.post('/subCategoryDatFound', extraCategoryController.subCategoryDatFound);

route.post('/addExtracategorydata', extraCategoryController.addExtracategorydata);

route.get('/view_extracategory', extraCategoryController.viewExtracategory);


module.exports = route;