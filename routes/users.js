// users.js
const { express } = require('../config/requires');
const router = express.Router();
const { sessionStore, session } = require('../config/session_config');

const auth = require('../middleware/auth');
const isadmin = require('../middleware/isadmin');

const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');

// Popraw import kontrolera użytkowników
const usersController = require('../controllers/usersController');


router.get('/', loginController.login);
router.post('/login', loginController.auth);
router.get('/dashboard', auth, dashboardController.dashboard);
router.get('/logout', auth, loginController.logout);

// Dodaj nową trasę dla strony z listą użytkowników
router.get('/userCreate', [auth, isadmin], usersController.addUser);
router.post('/add', [auth, isadmin], usersController.addUser);
router.get('/users', [auth, isadmin], usersController.listUsers);
router.get('/users/add', [auth, isadmin], usersController.addUserPage); // Dodaj trasę dla formularza dodawania
router.post('/users/add', [auth, isadmin], usersController.addUser); // Dodaj obsługę dodawania użytkownika
router.get('/users/edit/:id', [auth, isadmin], usersController.editUserPage); // Dodaj trasę dla formularza edycji
router.post('/users/edit', [auth, isadmin], usersController.editUser); // Dodaj obsługę edycji użytkownika
router.get('/users/delete/:id', [auth, isadmin], usersController.deleteUser);
// Dodaj ścieżkę do obsługi wyszukiwania użytkowników
router.get('/users/search', usersController.listUsers);

module.exports = router;
