const router = require('express').Router();

router.get('/protected', (req, res) => {
	res.send('Hello World');
});

router.use(
	'/admin/',
	(req, res, next) => {
		if (req.user.role == 'admin') {
			next();
		} else {
			return res.sendStatus(403);
		}
	},
	require('./admin')
);

router.use(
	'/participant/',
	(req, res, next) => {
		if (req.user.role == 'participant') {
			next();
		} else {
			return res.sendStatus(403);
		}
	},
	require('./participant')
);

module.exports = router;
