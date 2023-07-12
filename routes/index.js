const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		return res.sendStatus(403);
	}

	if (token == null || !req.app.get('token-whitelist').has(token)) {
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
		if (err) {
			return res.sendStatus(403);
		}
		const user = await User.findById(data.id);
		if (user) {
			req.user = user;
			next();
		} else {
			return res.sendStatus(403);
		}
	});
}

router.use('/api/', authenticateToken, require('./api'));

router.use('/', require('./auth'));

router.post('/logout', authenticateToken, (req, res) => {
	const token = req.cookies.token;
	req.app.get('token-whitelist').delete(token);
	res.clearCookie('token');
	return res.sendStatus(200);
});

module.exports = router;
