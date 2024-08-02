const Router = require('koa-router');
const authController = require('../controllers/authController');

const router = new Router();

// Route untuk registrasi pengguna
router.post('/register', authController.registerUser);

// Route untuk autentikasi pengguna
router.post('/login', authController.authenticateUser);

module.exports = router.routes();
