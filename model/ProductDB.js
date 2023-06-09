const mongoose = require('mongoose');
const multer = require('multer');
const productPath = '/uploads/product';
const path = require('path');


const productSchema = mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    extracategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracategory',
        required: true
    },
    pName: {
        type : String,
        required : true
    },
    pPrice : {
        type : String,
        required : true
    },
    pDescription :{
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    }
});

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',productPath));
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + '-'+ Date.now())
    }
});

productSchema.statics.thumbnailUpload = multer({storage : Storage}).single('thumbnail');
productSchema.statics.productPath = productPath;


const productDB = mongoose.model('Product', productSchema);

module.exports = productDB;