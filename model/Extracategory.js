const mongoose = require('mongoose');

const ExtraCatSchema = mongoose.Schema({
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategoryID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subcategory',
        required : true
    },
    extracategory : {
        type : String,
        required : true
    }
});

const extracatDB = mongoose.model('Extracategory', ExtraCatSchema);

module.exports = extracatDB;