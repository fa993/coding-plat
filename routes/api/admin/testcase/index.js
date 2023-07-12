const router = require('express').Router();
const Question = require('../../../models/Question');
const TestCase = require('../../../models/TestCase');
const fetch = require('node-fetch');

const SPHERE_API_BASE_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/';

router.post('/add', async (req, res) => {
	const { question_id, num, exp } = req.body;
	try {
		var question = await Question.findById({ _id: question_id });
		await TestCase.create({
			number: num,
			expected: exp,
			question_id: question_id,
		});
		res.sendStatus(200);
	} catch (ex) {
		return res.sendStatus(404);
	}
});

router.get('/list', async (req, res) => {
	const { id, offset } = req.body;
	return res.json(
		await TestCase.find({ question_id: id })
			.skip(offset || 0)
			.limit(5)
	);
});

router.post('/edit', async (req, res) => {
	const { id, exp } = req.body;
	const tc = await TestCase.findById(id);
	tc.expected = exp;
	await tc.save();
	return res.sendStatus(200);
});

module.exports = router;
