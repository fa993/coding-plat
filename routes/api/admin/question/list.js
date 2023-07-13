const router = require('express').Router();
const Question = require('../../../../models/Question');

router.get('/', async (req, res) => {
	return res.json(
		await Question.find({})
			.skip(req.query.offset || 0)
			.limit(5)
	);
});

module.exports = router;
