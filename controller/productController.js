const CategoryDB = require('../model/CategoryDB');
const SubcategoryDB = require('../model/SubcategoryDB');
const ExtracategoryDB = require('../model/Extracategory');
const ProductDB = require('../model/ProductDB')

module.exports.addProduct = (req, res) => {
    CategoryDB.find({}, (err, data) => {
        if (err) {
            console.log('Something Wrong');
        }
        return res.render('add_product', {
            caData: data
        });

    })
}


module.exports.ExtracategoryDataFound = (req, res) => {
    ExtracategoryDB.find({ subcategoryID: req.body.catID }, (err, data) => {
        if (err) {
            console.log('Something Wrong');
        }
        return res.render('catOption', {
            subData: data
        })
    })
}

module.exports.insertProductData = (req, res) => {
    ProductDB.thumbnailUpload(req,res,(err)=>{
        if(err)
        {
            console.log('Something Wrong');
        }
        if(req.file){
            const thumbnail = ProductDB.productPath + '/' + req.file.filename;
            req.body.thumbnail = thumbnail;
        }
        ProductDB.create(req.body, (err,data)=>{
            if(err)
            {
                console.log('Something Wrong');
            }
            return res.redirect('back');
        })
    })
}