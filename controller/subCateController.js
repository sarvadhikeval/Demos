const categoryDB = require('../model/CategoryDB');

const SubcategoryDB = require('../model/SubcategoryDB');

module.exports.addSubcategory = (req,res)=>{
    categoryDB.find({},(err,data)=>{
        if(err)
        {
            console.log('Something Wrong')
        }
        return res.render('add_subcategory',{
            catData : data
        });
    })
}

module.exports.addSubategorydata = (req,res)=>{
    SubcategoryDB.create(req.body,(err,data)=>{
        if(err)
        {
             console.log('Something Wrong');
        }
        req.flash('success','Subcategory Data Insetred Succeessfully');
        return res.redirect('back')
    })
}

module.exports.viewSubcategory = async (req,res)=>{
    const Subdata = await SubcategoryDB.find({}).populate('categoryID').exec();

    return res.render('view_subcategory',{
        Cadata : Subdata
    });
}