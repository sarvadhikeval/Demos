const mongoose = require('mongoose');
const multer = require('multer');
const { join } = require('path');
const path = require('path');
const admin_Path = '/uploads/admin'

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    profile :{
        type : String,
        required : true
    }
});

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',admin_Path));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now())
    }
});

AdminSchema.statics.uploadProfile = multer({storage : storage}).single('profile');
AdminSchema.statics.AdminPath = admin_Path;

const adminDB = mongoose.model('Admin_data', AdminSchema);

module.exports = adminDB;