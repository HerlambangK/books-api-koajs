// src/routes/bookRoutes.js

const Router = require('koa-router');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

// Apply authMiddleware to the routes that need authentication
router.post('/books', authMiddleware, bookController.createBook);
router.get('/books', authMiddleware, bookController.getBooks);
router.get('/books/:id', authMiddleware, bookController.getBook);
router.put('/books/:id', authMiddleware, bookController.updateBook);
router.delete('/books/:id', authMiddleware, bookController.deleteBook);

module.exports = router.routes();
