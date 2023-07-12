const router = require('express').Router();
const Question = require('../../../models/Question');
const TestCase = require('../../../models/TestCase');
const fetch = require('node-fetch');

const SPHERE_API_BASE_PR_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/problems/';
const SPHERE_API_SUFFIX = 'testcases/';

router.post('/add', async (req, res) => {
	try {
		const { question_id, num, inp, exp } = req.body;

		var question = await Question.findById({ _id: question_id });

		//10 is the exact judge id

		const response = await fetch(
			SPHERE_API_BASE_PR_URL +
				question.sphere_id +
				'/testcases?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
			{
				method: 'POST',
				body: JSON.stringify({ input: inp, output: exp, judgeid: 10 }),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (!response.ok) {
			return res.sendStatus(500);
		}

		const data = await response.json();

		console.log(data);

		await TestCase.create({
			number: num,
			inp: inp,
			expected: exp,
			question_id: question_id,
			sphere_number: data.number,
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
	const { id, inp, exp } = req.body;
	const tc = await TestCase.findById(id);
	if (exp) {
		tc.expected = exp;
	}
	if (inp) {
		tc.input = inp;
	}
	await tc.save();
	return res.sendStatus(200);
});

module.exports = router;
