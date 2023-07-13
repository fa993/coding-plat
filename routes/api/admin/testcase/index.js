const router = require('express').Router();
const Question = require('../../../../models/Question');
const TestCase = require('../../../../models/TestCase');
const fetch = require('node-fetch');

const SPHERE_API_BASE_PR_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/problems/';

router.post('/add', async (req, res) => {
	try {
		const { question_id, num, inp, exp, time } = req.body;

		var question = await Question.findById({ _id: question_id });

		//10 is the exact judge id

		const response = await fetch(
			SPHERE_API_BASE_PR_URL +
				question.sphere_id +
				'/testcases?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
			{
				method: 'POST',
				body: JSON.stringify({
					input: inp || '',
					output: exp,
					timeLimit: time || 1,
					judgeId: 10,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (!response.ok) {
			console.log(await response.text());

			return res.sendStatus(500);
		}

		const data = await response.json();

		const tc = await TestCase.create({
			number: num,
			inp: inp || '',
			expected: exp,
			question_id: question_id,
			time_limit: time || 1,
			sphere_number: data.number,
		});

		res.send(tc._id);
	} catch (ex) {
		return res.sendStatus(404);
	}
});

router.get('/list', async (req, res) => {
	try {
		const id = req.query.id;
		const offset = req.query.offset;
		return res.json(
			await TestCase.find({ question_id: id })
				.skip(offset || 0)
				.limit(5)
		);
	} catch (ex) {
		res.sendStatus(404);
	}
});

router.put('/edit', async (req, res) => {
	try {
		const { id, inp, exp, time } = req.body;
		const tc = await TestCase.findById(id);
		const question = await Question.findById(tc.question_id);
		if (exp) {
			tc.expected = exp;
		}
		if (inp) {
			tc.input = inp;
		}
		if (time) {
			tc.time_limit = time;
		}
		const response = await fetch(
			SPHERE_API_BASE_PR_URL +
				question.sphere_id +
				'/testcases/' +
				tc.sphere_number +
				'?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
			{
				method: 'PUT',
				body: JSON.stringify({
					input: inp || '',
					output: exp,
					timeLimit: time || 1,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (!response.ok) {
			console.log(await response.text());

			return res.sendStatus(500);
		}

		const data = await response.json();

		console.log(data);

		await tc.save();
		return res.sendStatus(200);
	} catch (ex) {
		res.sendStatus(404);
	}
});

module.exports = router;
