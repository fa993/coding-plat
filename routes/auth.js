const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

function generateAccessToken(id) {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

router.post('/signup', async (req, res) => {
	const { email, password, username, role } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(401).json({ message: 'User already exists' });
	}
	const user = await User.create({ email, password, username, role });
	const token = generateAccessToken(user._id);
	res.cookie('token', token, {
		withCredentials: true,
		httpOnly: false,
		// 1 day max age
		maxAge: 24 * 3600 * 1000,
	});
	req.app.get('token-whitelist').add(token);
	res.status(201).json({
		message: 'User signed in successfully',
		success: true,
		email,
	});
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({ message: 'Incorrect password or email' });
	}
	const auth = await bcrypt.compare(password, user.password);
	if (!auth) {
		return res.status(401).json({ message: 'Incorrect password or email' });
	}
	const token = generateAccessToken(user._id);
	res.cookie('token', token, {
		withCredentials: true,
		httpOnly: false,
		maxAge: 24 * 3600 * 1000,
	});
	req.app.get('token-whitelist').add(token);
	res.status(200).json({ message: 'User logged in successfully', email });
});

module.exports = router;
