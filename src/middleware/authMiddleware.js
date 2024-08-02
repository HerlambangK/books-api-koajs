// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (ctx, next) => {
	const authHeader = ctx.request.headers['authorization'];

	if (!authHeader) {
		ctx.status = 401;
		ctx.body = {
			error: 'Authorization header is required',
		};
		return;
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		ctx.status = 401;
		ctx.body = {
			error: 'Bearer token is missing',
		};
		return;
	}

	try {
		console.log('Received token:', token); // Log token for debugging
		// const decoded = jwt.verify(token, 'your-secret-key');
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'your-secret-key'
		);
		ctx.state.user = decoded; // Set user data in context
		await next();
	} catch (err) {
		console.error('Token verification error:', err); // Log error for debugging
		ctx.status = 401;
		ctx.body = {
			error: 'Invalid or expired token',
		};
	}
};

module.exports = authMiddleware;
