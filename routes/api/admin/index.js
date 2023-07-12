const router = require('express').Router();
const Question = require('../../../models/Question');
const TestCase = require('../../../models/TestCase');
const fetch = require('node-fetch');

const SPHERE_API_BASE_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/';

router.post('/addq', async (req, res) => {
	const { title, desc } = req.body;

	const response = await fetch(
		SPHERE_API_BASE_URL +
			'problems?access_token=' +
			process.env.SPHERE_ACCESS_TOKEN,
		{
			method: 'POST',
			body: JSON.stringify({ name: title, body: desc, masterjudgeId: 1000 }),
			headers: { 'Content-Type': 'application/json' },
		}
	);

	if (!response.ok) {
		return res.sendStatus(500);
	}

	const data = await response.json();

	console.log(data);

	const question = await Question.create({
		title,
		description: desc,
		sphere_id: data.id,
	});

	res.send(question._id);
});

router.get('/listq', async (req, res) => {
	const { offset } = req.body;
	return res.json(
		await Question.find({})
			.skip(offset || 0)
			.limit(5)
	);
});

router.post('/editq', async (req, res) => {
	const { id, title, desc } = req.body;
	try {
		const question = await Question.findById(id);
		if (title) {
			question.title = title;
		}
		if (desc) {
			question.description = desc;
		}

		const response = await fetch(
			SPHERE_API_BASE_URL +
				'problems/' +
				question.sphere_id +
				'?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
			{
				method: 'PUT',
				body: JSON.stringify({
					name: question.title,
					body: question.description,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (!response.ok) {
			console.log(await response.text());
			return res.sendStatus(500);
		}

		await question.save();
		res.sendStatus(200);
	} catch (ex) {
		return res.sendStatus(400);
	}
});

router.post('/deleteq', async (req, res) => {
	const { id } = req.body;
	try {
		const qu = await Question.findById(id);
		const response = await fetch(
			SPHERE_API_BASE_URL +
				'problems/' +
				qu.sphere_id +
				'?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
			{
				method: 'DELETE',
			}
		);

		if (!response.ok) {
			console.log(await response.text());
			return res.sendStatus(500);
		}
		await Question.deleteOne({ _id: id });
	} catch (ex) {
		console.log(ex);
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
});

router.post('/addtc', async (req, res) => {
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

router.get('/listtc', async (req, res) => {
	const { id, offset } = req.body;
	return res.json(
		await TestCase.find({ question_id: id })
			.skip(offset || 0)
			.limit(5)
	);
});

router.post('/edittc', async (req, res) => {
	const { id, exp } = req.body;
	const tc = await TestCase.findById(id);
	tc.expected = exp;
	await tc.save();
	return res.sendStatus(200);
});

module.exports = router;
