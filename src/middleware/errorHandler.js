const errorHandler = async (ctx, next) => {
	try {
		await next(); // Memanggil middleware berikutnya
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			message: err.message || 'Internal Server Error',
		};
		console.error(err);
	}
};

module.exports = errorHandler;
