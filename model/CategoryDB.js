const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
});


const CategoryDB = mongoose.model('Category', categorySchema);

module.exports = CategoryDB;