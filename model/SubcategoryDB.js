const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    categoryID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategory : {
        type : String,
        required : true
    }
});


const SubcategoryDB = mongoose.model('Subcategory', subcategorySchema);

module.exports = SubcategoryDB;