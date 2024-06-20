//workersController.js
const { knex } = require('../config/knex');

// Sprawdzenie, czy użytkownik jest administratorem
const isAdmin = (user) => {
    return user && user.role === 'admin'; // Możesz dostosować to według swoich wymagań
};

const listWorkers = async (req, res) => {
    try {
        const workers = await knex('workers').select('*');
        console.log('Pobrani pracownicy:', workers);
        const userIsAdmin = isAdmin(req.user); // Sprawdzenie, czy użytkownik jest administratorem
        const user = await knex('users').select('*').where('id', req.session.userId).first();
        res.render('workers/workers', { workers, isAdmin: userIsAdmin, user: user }); // Przekazanie zmiennej isAdmin

    } catch (error) {
        console.error('Błąd podczas pobierania pracowników:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addWorkerPage = async (req, res) => {
    const user = await knex('users').select('*').where('id', req.session.userId).first();
    res.render('workers/worker_create', { user: user });
};

const worker_create = async (req, res) => {
    try {
        console.log(req.body);
        const { name, surname, email, position, contract, vacationDays, workHours, moneyperHour, seniorityinYears } = req.body;
        await knex('workers').insert({ name, surname, email, position, contract, vacationDays, workHours, moneyperHour, seniorityinYears });
        res.redirect('/workers');
    } catch (error) {
        console.error('Błąd podczas dodawania pracownika:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editWorkerPage = async (req, res) => {
    try {
        const workerId = req.params.id;
        const worker = await knex('workers').select('*').where('id', workerId).first();
        const user = await knex('users').select('*').where('id', req.session.userId).first();
        res.render('workers/editWorker', { worker, user: user });
    } catch (error) {
        console.error('Błąd podczas pobierania danych pracownika:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editWorker = async (req, res) => {
    try {
        const { id, name, surname, email, position, contract, vacationDays, workHours, moneyperHour, seniorityinYears } = req.body;
        await knex('workers').where('id', id).update({ name, surname, email, position, contract, vacationDays, workHours, moneyperHour, seniorityinYears });
        res.redirect('/workers');
    } catch (error) {
        console.error('Błąd podczas edycji pracownika:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteWorker = async (req, res) => {
    try {
        const workerId = req.params.id;
        await knex('workers').where('id', workerId).del();
        res.redirect('/workers');
    } catch (error) {
        console.error('Błąd podczas usuwania pracownika:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    listWorkers,
    addWorkerPage,
    worker_create,
    editWorkerPage,
    editWorker,
    deleteWorker
};
