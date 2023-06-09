const { ReturnDocument } = require('mongodb');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const adminDB = require('../model/AdminDB');

passport.use(new passportLocal({
    usernameField: 'email'
}, (email, password, done) => {
    adminDB.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('Something Wrong');
            return done(null, err)
        }
        if (!user || user.password != password) {
            console.log('Email And Password Not Match')
            return done(null, false);
        }
        return done(null, user);
    })
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser((id, done) => {
    adminDB.findById(id, (err, user) => {
        if (err) {
            console.log('Data not Found')
            return done(null, err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login')
}

passport.setAuthentication = (req,res,next)=>{
    res.locals.user = req.user;
    return next()
}


module.exports = passport;