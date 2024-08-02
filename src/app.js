const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler'); // Middleware error handler

const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());
app.use(errorHandler); // Middleware error handler

// Rute
router.use('/auth', authRoutes);
router.use('/api', bookRoutes);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
