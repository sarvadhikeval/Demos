const categoryDB = require('../model/CategoryDB');
const SubcategoryDB = require('../model/SubcategoryDB');
const extracatDB = require('../model/Extracategory')

module.exports.addExtracategory = (req, res) => {

    categoryDB.find({}, (err, data) => {
        if (err) {
            console.log('Something Wrong');
        }
        return res.render('add_extracategory', {
            excaData: data
        });
    });
}


module.exports.subCategoryDatFound = (req, res) => {
    SubcategoryDB.find({ categoryID: req.body.catID }, (err, data) => {
        if (err) {
            console.log('Something Wrong');
        }
        return res.render('catOption', {
            subData: data
        });
    })
}

module.exports.addExtracategorydata = (req, res) => {
    extracatDB.create(req.body, (err, data) => {
        if (err) {
            console.log('Something Wrong');
        }
        req.flash('success', 'Data Inserted');
        return res.redirect('back')
    })
}

module.exports.viewExtracategory = async (req, res) => {
    const extraData = await extracatDB.find({}).populate('categoryID').populate('subcategoryID').exec();
    return res.render('view_extracategory',{
        extracaData : extraData
    });
}   

