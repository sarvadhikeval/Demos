const express = require('express');

const route = express.Router();
const categoryController = require('../controller/categoryController')

route.get('/add_category', categoryController.addCategory);

route.post('/addCategorydata', categoryController.addCategorydata);

route.get('/view_category', categoryController.viewCategory)

module.exports = route;