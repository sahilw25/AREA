const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');


exports.getLogiinPage = (req, res) => {
    const viewsdata = {
        pageTitle: 'login page'
    };
        res.render('login', viewsdata);
}

exports.getsigninPage = (req, res) => {
    const viewsdata = {
        pageTitle: 'SignIn page'
    };
        res.render('signin', viewsdata);
}

exports.postsignin = async(req, res) => {
    const { name,email,mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ name,email,mobile, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error: Unable to register user');
        console.log(error)
    }
}

exports.postlogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            // req.session.userId = user.id;
            req.session.userId = user.id;
            req.session.name = user.name;
            req.user = user.id;
            res.redirect('/');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Error: Unable to log in');
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error: Unable to log out');
        }
        res.redirect('/login');
    });
}