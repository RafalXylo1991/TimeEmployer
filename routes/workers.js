//workers.js

const { express } = require('../config/requires');
const router = express.Router();
const workersController = require('../controllers/workersController');
const auth = require('../middleware/auth');

router.get('/', auth, workersController.listWorkers); // Lista pracowników
router.get('/add', auth, workersController.addWorkerPage); // Strona do dodawania pracownika
router.post('/add', auth, workersController.worker_create); // Obsługa dodawania pracownika
router.get('/edit/:id', auth, workersController.editWorkerPage); // Strona do edycji pracownika
router.post('/edit', auth, workersController.editWorker); // Obsługa edycji pracownika
router.get('/delete/:id', auth, workersController.deleteWorker); // Obsługa usuwania pracownika

module.exports = router;


