const categoryDB = require('../model/CategoryDB')

module.exports.addCategory = (req,res)=>{
    return res.render('add_category');
}

module.exports.addCategorydata = (req,res)=>{
    categoryDB.create(req.body,(err,data)=>{
        if(err)
        {
            console.log('Something Wrong');
        }
        req.flash('success','Category Instred Successfully');
        return res.redirect('back');
    }) 
}

module.exports.viewCategory = (req,res)=>{

    categoryDB.find({},(err,data)=>{
        if(err)
        {
            console.log('Something Wrong')

        }
        return res.render('view_category',{
            Cadata : data
        });

    })
}
