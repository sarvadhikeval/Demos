const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Admin_panel');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err)
    {
        console.log('Database not connected');
        return false
    }
    console.log('Database is connected');
});


module.exports = db;
