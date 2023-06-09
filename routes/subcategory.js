const express = require('express');

const route = express.Router();
const subCateController = require('../controller/subCateController')

route.get('/add_subcategory', subCateController.addSubcategory);

route.post('/addSubategorydata', subCateController.addSubategorydata);

route.get('/view_subcategory', subCateController.viewSubcategory);

module.exports = route;