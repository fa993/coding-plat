const router = require('express').Router();
const Question = require('../../../../models/Question');
const TestCase = require('../../../../models/TestCase');
const fetch = require('node-fetch');

const SPHERE_API_BASE_PR_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/problems';

router.post('/add', async (req, res) => {
	const { title, desc } = req.body;

	//1000 is the id for the generic master judge
	const response = await fetch(
		SPHERE_API_BASE_PR_URL + '?access_token=' + process.env.SPHERE_ACCESS_TOKEN,
		{
			method: 'POST',
			body: JSON.stringify({ name: title, body: desc, masterjudgeId: 1000 }),
			headers: { 'Content-Type': 'application/json' },
		}
	);

	if (!response.ok) {
		console.log(await response.text());
		return res.sendStatus(500);
	}

	const data = await response.json();

	const question = await Question.create({
		title,
		description: desc,
		sphere_id: data.id,
	});

	res.send(question._id);
});

router.get('/list', async (req, res) => {
	const { offset } = req.body;
	return res.json(
		await Question.find({})
			.skip(offset || 0)
			.limit(5)
	);
});

router.post('/edit', async (req, res) => {
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
			SPHERE_API_BASE_PR_URL +
				'/' +
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

router.post('/delete', async (req, res) => {
	const { id } = req.body;
	try {
		const qu = await Question.findById(id);
		const response = await fetch(
			SPHERE_API_BASE_PR_URL +
				'/' +
				+qu.sphere_id +
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
		await TestCase.deleteMany({ question_id: id });
		await Question.deleteOne({ _id: id });
	} catch (ex) {
		console.log(ex);
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
});

module.exports = router;
