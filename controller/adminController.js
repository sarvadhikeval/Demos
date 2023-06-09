const adminDB = require('../model/AdminDB');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const nodemailer = require('nodemailer');

module.exports.dashboard = (req, res) => {
    return res.render('dashboard');
}

module.exports.add_admin = (req, res) => {
    return res.render('add_admin', {
        adminRec: req.cookies.adminData
    });
}

module.exports.view_admin = (req, res) => {
    adminDB.find({}, (err, data) => {
        if (err) {
            console.log('Can not find data');
            return false;
        }
        return res.render('view_admin', {
            AdminRec: data,
            adminRec: req.cookies.adminData
        })
    })
}

module.exports.addAdminData = (req, res) => {
    adminDB.uploadProfile(req, res, (err) => {
        if (err) {
            console.log('Data Not Inserted');
            return false
        }
        if (req.file) {
            req.body.profile = ImagePath = adminDB.AdminPath + '/' + req.file.filename;
        }
        req.body.name = req.body.fname + ' ' + req.body.lname;
        adminDB.create(req.body, (err, data) => {
            if (err) {
                console.log('Can not data inserted')
                return false;
            }
            return res.redirect('back')
        })
    })
}

module.exports.adminDeleteData = (req, res) => {
    adminDB.findById(req.params.id, (err, data) => {
        if (err) {
            console.log('Can not find data');
            return false
        }
        if (data.profile != 'null') {
            fs.unlinkSync(path.join(__dirname, '..', data.profile));
        }
        adminDB.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                console.log('Can not Delete Data');
                return false;
            }
            return res.redirect('back')
        });
    })
};

module.exports.adminUpdateData = (req, res) => {
    adminDB.findById(req.params.id, (err, data) => {
        if (err) {
            console.log('Can not find update data')
            return false
        }
        res.render('updateAdmin', {
            AdminRec: data,
            adminRec: req.cookies.adminData
        })
    })
}

module.exports.UpdateAdminData = (req, res) => {

    adminDB.uploadProfile(req, res, (err) => {
        let updateKey = req.body.updateKey
        if (err) {
            console.log('Something Wrong')
            return false
        }
        console.log(req.file)
        if (req.file) {
            adminDB.findById(updateKey, (err, data) => {
                if (err) {
                    console.log('Can not find data')
                    return false
                }
                if (data.profile) {

                    fs.unlinkSync(path.join(__dirname, '..', data.profile));
                }

                if (req.file) {
                    req.body.profile = adminDB.AdminPath + '/' + req.file.filename
                }
                req.body.name = req.body.fname + ' ' + req.body.lname;
                adminDB.findByIdAndUpdate(updateKey, req.body, (err, data) => {
                    if (err) {
                        console.log('Can not update your data')
                        return false
                    }
                    return res.redirect('/view-admin')
                })
            })
        }
        else {
            adminDB.findById(updateKey, (err, data) => {
                if (err) {
                    console.log('Can not find data')
                    return false
                }
                if (data.profile) {
                    req.body.profile = data.profile
                }
                req.body.name = req.body.fname + ' ' + req.body.lname;
                adminDB.findByIdAndUpdate(updateKey, req.body, (err, data) => {
                    if (err) {
                        console.log('Ca not update data')
                        return false
                    }
                    return res.redirect('/view-admin');
                })
            })
        }
    })
}

module.exports.show_admin = (req, res) => {
    adminDB.findById(req.params.id, (err, data) => {
        if (err) {
            console.log('Data not found')
            return false;
        }
        return res.render('show_admin', {
            AdminRec: data,
            adminRec: req.cookies.adminData

        });
    })
}

module.exports.register = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('register')
}

module.exports.registration = (req, res) => {

    adminDB.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log('Data not found');
            return false
        }
        if (!data) {
            if (req.body.password == req.body.cPassword) {
                adminDB.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    city: 'null',
                    gender: 'null',
                    description: 'null',
                    profile: 'null',
                    phone: 'null',
                    hobby: []
                }, (err, data) => {
                    if (err) {
                        console.log('Something Wrong')
                        return false
                    }
                    return res.redirect('/login')
                })
            }
            else {
                console.log('password And Confirm password not match');
                return res.redirect('back')
            }
        }
        else {
            console.log('Email Address match!! Try another email address');
            return res.redirect('back');
        }
    })
}


module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('login');
}

module.exports.ActiveAdmin = (req, res) => {
    adminDB.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log('Data not found')
            return false
        }
        if (data) {
            if ((data.password) == (req.body.password)) {
                res.cookie('adminId', data.id);
                res.cookie('adminData', data);
                return res.redirect('/')
            }
            else {
                console.log('password not match!!')
                return res.redirect('back');
            }
        }
        else {
            console.log('Email not match!!')
            return res.redirect('back')
        }
    })
}

module.exports.logOut = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) {
                console.log('Something Wrong')
                return res.redirect('/');
            }
            return res.redirect('/login');
        });
    }
}

module.exports.sessionLogin = (req, res) => {
    req.flash('success', 'Login Successfully');
    return res.redirect('/');
}

module.exports.changePassword = (req, res) => {
    return res.render('changePass');
}

module.exports.formChangePassWord = (req, res) => {
    const LCPass = req.user.password;
    const nPass = req.body.npass;
    const coPass = req.body.copass;
    const cPass = req.body.cpass;

    if (LCPass == cPass) {
        if (cPass != nPass) {
            if (nPass == coPass) {
                adminDB.findByIdAndUpdate(req.user.id, {
                    password: nPass
                }, (err, data) => {
                    if (err) {
                        console.log('Something Wrong')
                        return false
                    }
                    return res.redirect('/logOut')
                })
            }
            else {
                console.log('New & Confirm Password are Match!!!')
                return res.redirect('back');
            }
        }
        else {
            console.log('Current Password and New Password Are Same!!!')
            return res.redirect('back');
        }
    }
    else {
        console.log('Your Current Password Is not Match Your Form Data!!!')
        return res.redirect('back');
    }
}

module.exports.lostPassword = (req, res) => {
    adminDB.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            req.flash('error', 'Something Wrong!! Please Try Letter');
            return res.redirect('back')
        }
        if (data) {
            const otp = Math.floor(Math.random() * 10000 + 100)
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "e6b7d6a29ff81a",
                    pass: "692e127db25e24"
                }
            });

            let info = transport.sendMail({
                from: "kevalran720@gmail.com", // sender address
                to: data.email, // list of receivers
                subject: "Otp", // Subject line
                text: "OTP testing", // plain text body
                html: `<h1>Your OTP is Here: ${otp} </h1>`, // html body
            });
            res.cookie('Forgot_Password', JSON.stringify([otp, data.email]));
            return res.redirect('/checkOTP');

        }
        else {
            req.flash('error', 'Record Not Found!!!');
            return res.redirect('back')
        }
    })
}


module.exports.checkOTP = (req, res) => {
    return res.render('checkOtp');
}

module.exports.verifyOTP = (req, res) => {
    const CookieData = JSON.parse(req.cookies.Forgot_Password);

    if (CookieData[0] == req.body.otp) {
        return res.redirect('/ForgottenPassword')
    }
    else {
        req.flash('error', 'OTP not Match');
        return res.redirect('back')
    }
}

module.exports.ForgottenPassword = (req, res) => {
    return res.render('resetPass');
}

module.exports.changeForPassword = (req, res) => {
    const CookieData = JSON.parse(req.cookies.Forgot_Password);
    if (req.body.npass == req.body.cpass) {
        adminDB.findOne({ email: CookieData[1] }, (err, data) => {
            if (err) {
                req.flash('error', 'Something Wrong')
                return res.redirect('back');
            }
            if (data) {
                adminDB.findByIdAndUpdate(data.id, {
                    password: req.body.npass
                }, (err, data) => {
                    if (err) {
                        req.flash('error', 'Something Wrong')
                        return res.redirect('back');
                    }
                    return res.redirect('/login');
                })
            }
            else {
                req.flash('error', 'Data Not Found');
                return res.redirect('back');
            }
        })
    }
    else {
        req.flash('error', 'New Password And Confirm Password Not Match');
        return res.redirect('back');
    }
}