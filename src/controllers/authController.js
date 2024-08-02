const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-secret-key';

// Registrasi pengguna baru
const registerUser = async (ctx) => {
	try {
		const { email, password, name } = ctx.request.body;

		// Validasi input
		if (!email || !password || !name) {
			ctx.status = 400;
			ctx.body = { error: 'Email, password, and name are required' };
			return;
		}

		// Cek apakah email sudah digunakan
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email, // Pastikan `email` diatur dengan benar
			},
		});

		if (existingUser) {
			ctx.status = 400;
			ctx.body = { error: 'Email already in use' };
			return;
		}

		// Enkripsi password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Buat pengguna baru
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		ctx.status = 201;
		ctx.body = newUser;
	} catch (error) {
		console.error('Error in registerUser:', error); // Tambahkan log kesalahan
		ctx.status = 500;
		ctx.body = { error: 'Failed to register user' };
	}
};

// Autentikasi pengguna
const authenticateUser = async (ctx) => {
	try {
		const { email, password } = ctx.request.body;

		// Validasi input
		if (!email || !password) {
			ctx.status = 400;
			ctx.body = { error: 'Email and password are required' };
			return;
		}

		// Cari pengguna berdasarkan email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			ctx.status = 401;
			ctx.body = { error: 'Invalid email or password' };
			return;
		}

		// Buat token JWT
		const token = jwt.sign({ id: user.id, email: user.email }, secret, {
			expiresIn: '1h',
		});

		ctx.body = { token };
	} catch (error) {
		console.error('Error in authenticateUser:', error); // Tambahkan log kesalahan
		ctx.status = 500;
		ctx.body = { error: 'Failed to authenticate user' };
	}
};

module.exports = {
	registerUser,
	authenticateUser,
};
