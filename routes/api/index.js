const router = require('express').Router();

router.get('/protected', (req, res) => {
	res.send('Hello World');
});

//global rulesets since these should be accesible by both

router.use('/question/list', require('./admin/question/list'));

router.use('/results', require('./participant/results'));

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
