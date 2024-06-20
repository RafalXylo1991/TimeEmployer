// dashboardController.js
const { knex } = require('../config/knex');

const dashboard = async (req, res) => {
    try {




        const user = await knex('users').select('id', 'name', 'isadmin').where('id', req.session.userId).first();


        const isAdmin = user && user.isadmin;

        let data = {
            'user': user
        }

        // Renderuj widok dashboard.ejs, przekazując dane użytkowników, informacje o zalogowanym użytkowniku i uprawnienia administratora
        res.render('dashboard/dashboard', data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    dashboard,
};
