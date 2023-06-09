const express = require('express');
const adminController = require('../controller/adminController');
const passport= require('passport');

const route = express.Router();

route.post('/sessionLogin',passport.authenticate('local', {failureRedirect : '/login'}),adminController.sessionLogin);

route.get('/login', adminController.login);

route.post('/ActiveAdmin', adminController.ActiveAdmin);

route.get('/logOut', adminController.logOut);

route.get('/register', adminController.register);

route.post('/registration', adminController.registration);

route.get('/',passport.checkAuthentication, adminController.dashboard);

route.get('/add-admin', passport.checkAuthentication,adminController.add_admin);

route.get('/view-admin', passport.checkAuthentication,adminController.view_admin);

route.post('/addAdminData', passport.checkAuthentication,adminController.addAdminData);

route.get('/adminDeleteData/:id', passport.checkAuthentication,adminController.adminDeleteData);

route.get('/adminUpdateData/:id', passport.checkAuthentication, adminController.adminUpdateData);

route.post('/UpdateAdminData', passport.checkAuthentication, adminController.UpdateAdminData);

route.get('/show-admin/:id', passport.checkAuthentication, adminController.show_admin);

route.get('/changePassword',passport.checkAuthentication ,adminController.changePassword);

route.post('/formChangePassWord',passport.checkAuthentication ,adminController.formChangePassWord);

route.post('/lostPassword', adminController.lostPassword);

route.get('/checkOTP', adminController.checkOTP);

route.post('/verifyOTP', adminController.verifyOTP);

route.get('/ForgottenPassword', adminController.ForgottenPassword);

route.post('/changeForPassword', adminController.changeForPassword);

route.use('/category',passport.checkAuthentication, require('./category'));

route.use('/subcategory',passport.checkAuthentication ,require('./subcategory'));

route.use('/extracategory',passport.checkAuthentication, require('./extracategory'));

route.use('/product', require('./product'));

module.exports = route;