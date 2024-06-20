// usersController.js
const { knex } = require('../config/knex');



const listUsers = async (req, res) => {
    try {
        // Pobierz dane z bazy danych
        const usersQuery = knex('users').select('id', 'name', 'email');

        // Sprawdź, czy zostało wysłane zapytanie wyszukiwania
        const searchQuery = req.query.search;
        if (searchQuery) {
            // Sprawdź, czy przekazana wartość jest liczbą całkowitą
            const userId = parseInt(searchQuery);
            if (!isNaN(userId)) {
                // Jeśli przekazana wartość jest liczbą całkowitą, wyszukaj użytkownika po identyfikatorze
                usersQuery.where('id', userId);
            } else {
                // Jeśli przekazana wartość nie jest liczbą całkowitą, wyszukaj użytkownika po nazwie lub adresie e-mail
                usersQuery.where('name', 'like', `%${searchQuery}%`)
                    .orWhere('email', 'like', `%${searchQuery}%`);
            }
        }

        // Pobierz informacje o aktualnie zalogowanym użytkowniku
        const user = await knex('users').select('*').where('id', req.session.userId).first();


        // Sprawdź, czy użytkownik ma uprawnienia administratora
        const isAdmin = user && user.isadmin;

        // Pobierz wyniki zapytania
        const users = await usersQuery;

        // Renderuj widok users.ejs, przekazując dane użytkowników, informacje o zalogowanym użytkowniku i uprawnienia administratora
        res.render('user/users', { users, user, isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const addUser = async (req, res) => {
    try {
        // Pobierz dane z formularza
        const { name, email, password, isadmin, role } = req.body;
        const admin = isadmin == 'on' ? true : false;
        const setrole = role == 'on' ? 'admin' : 'user';
        console.log(req.body)
        console.log(admin)
        console.log(setrole)
            // Dodaj nowego użytkownika do bazy danych
            / await knex('users').insert({
                name,
                email,
                password,
                isadmin: admin,
                role: setrole
            });

        console.log('Użytkownik dodany pomyślnie');

        // Przekieruj na listę użytkowników
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const editUser = async (req, res) => {
    try {
        // Pobierz dane z formularza
        const { id, name, email, password } = req.body;

        // Zaktualizuj użytkownika w bazie danych
        await knex('users').where('id', id).update({
            name,
            password,
            email,

        });

        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteUser = async (req, res) => {
    try {



        // Usuń użytkownika z bazy danych
        await knex('users').where('id', req.params.id).del();

        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const addUserPage = async (req, res) => {
    const user = await knex('users').select().where('id', req.session.userId).first();

    console.log(user)
    res.render('user/user_create', { user: user }); // Utwórz widok dla dodawania użytkownika
};



const editUserPage = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await knex('users').select('id', 'name', 'email', 'password').where('id', userId).first();
        res.render('user/editUser', { user }); // Utwórz widok dla edycji użytkownika
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    listUsers,
    addUser,
    editUser,
    deleteUser,
    addUserPage,
    editUserPage,
};
