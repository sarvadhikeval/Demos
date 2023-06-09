const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 4600;
const server = express();

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const flash = require('connect-flash');
const customMiddleware = require('./config/customMiddleware')


server.use(urlencoded());
server.use(cookieParser());

const admin_db = require('./config/mongoose');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static('asstes'));
server.use('/uploads', express.static(path.join(__dirname,'/uploads')));


server.use(session({
    name : 'RnwIt Solution',
    secret : 'RNW',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 60*100*1000
    }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.setAuthentication);
server.use(flash());
server.use(customMiddleware.setFlash);


server.use('/', require('./routes'));

server.listen(port, (err)=>{
    if(err)
    {
        console.log('Server is not responding')
        return false;
    }
    console.log('Server is Responding');
});
