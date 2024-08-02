const prisma = require('../models/prismaClient');

exports.createBook = async (ctx) => {
	const {
		title,
		date,
		img,
		isbn,
		seri,
		halaman,
		dimensi,
		content,
		author,
		category,
		price,
	} = ctx.request.body;
	try {
		const newBook = await prisma.book.create({
			data: {
				title,
				date,
				img,
				isbn,
				seri,
				halaman,
				dimensi,
				content,
				author,
				category,
				price,
			},
		});
		ctx.status = 201;
		ctx.body = newBook;
	} catch (error) {
		ctx.status = 500;
		ctx.body = { error: 'Failed to create book' };
	}
};

exports.getBooks = async (ctx) => {
	try {
		const books = await prisma.book.findMany();
		ctx.status = 200;
		ctx.body = books;
	} catch (error) {
		ctx.status = 500;
		ctx.body = { error: 'Failed to get books' };
	}
};

exports.getBook = async (ctx) => {
	const { id } = ctx.params;
	try {
		const book = await Prisma.book.findUnique({ where: { id: Number(id) } });
		if (book) {
			ctx.status = 200;
			ctx.body = book;
		} else {
			ctx.status = 404;
			ctx.body = { error: 'Book not found' };
		}
	} catch (error) {
		ctx.status = 500;
		ctx.body = { error: 'Failed to get book' };
	}
};

exports.updateBook = async (ctx) => {
	const { id } = ctx.params;
	const {
		title,
		date,
		img,
		isbn,
		seri,
		halaman,
		dimensi,
		content,
		author,
		category,
		price,
	} = ctx.request.body;
	try {
		const updatedBook = await prisma.book.update({
			where: { id: Number(id) },
			data: {
				title,
				date,
				img,
				isbn,
				seri,
				halaman,
				dimensi,
				content,
				author,
				category,
				price,
			},
		});
		ctx.status = 200;
		ctx.body = updatedBook;
	} catch (error) {
		ctx.status = 500;
		ctx.body = { error: 'Failed to update book' };
	}
};

exports.deleteBook = async (ctx) => {
	const { id } = ctx.params;
	try {
		const book = await prisma.book.findUnique({ where: { id: Number(id) } });

		if (book) {
			await prisma.book.delete({ where: { id: Number(id) } });
			ctx.status = 200;
			ctx.body = { message: 'Berhasil dihapus' }; // Pesan berhasil dihapus
		} else {
			ctx.status = 404;
			ctx.body = { error: 'ID tidak ada' }; // Pesan ID tidak ada
		}
	} catch (error) {
		ctx.status = 500;
		ctx.body = { error: 'Gagal menghapus buku' }; // Pesan gagal menghapus
	}
};
