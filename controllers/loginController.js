// loginController.js
const { knex } = require('../config/knex');

const auth = async (req, res) => {
    console.log(req.session);
    try {
        const user = await knex("users").select().where('email', req.body.email).first();


        if (!user || user.password !== req.body.password) {
            // Błąd uwierzytelniania
            return res.render('index', { error: 'Błędny email lub hasło.' });
        }

        req.session.isAuth = true;
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin; // Dodaj informację o uprawnieniach administratora

        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.render('index', { error: 'Wystąpił błąd podczas logowania.' });
    }
};

const login = async (req, res) => {
    return res.render('index', { layout: false });
};

const logout = async (req, res) => {

    req.session.destroy();
    return res.render('index', { layout: false });
};

module.exports = {
    auth,
    login,
    logout
};
