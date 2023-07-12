const router = require('express').Router();
const Question = require('../../../models/Question');
const TestCase = require('../../../models/TestCase');

const SPHERE_API_BASE_SB_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/submissions';

router.post('/create', async (req, res) => {
	const { src, lang, qid } = req.body;
	//fetch the sphere id for the question from the db
	const qu = await Question.findById(qid);

	//allow only 2 languages java and cpp for demonstration
	//the list could be easily expanded
	if (lang == 'java') {
		var lngid = 10;
	} else if (lang == 'cpp') {
		var lngid = 1;
	} else {
		res.sendStatus(401);
	}

	console.log(lngid);

	const response = await fetch(
		SPHERE_API_BASE_PR_URL + '?access_token=' + process.env.SPHERE_ACCESS_TOKEN,
		{
			method: 'POST',
			body: JSON.stringify({
				problemId: qu.sphere_id,
				source: src,
				compilerId: lngid,
			}),
			headers: { 'Content-Type': 'application/json' },
		}
	);

	if (!response.ok) {
		console.log(await response.text());
		return res.sendStatus(500);
	}

	const data = await response.json();

	res.send(data.id);
});

router.get('/results', async (res, req) => {
	const { id } = req.body;
	const response = await fetch(
		SPHERE_API_BASE_PR_URL +
			'/' +
			id +
			'?access_token=' +
			process.env.SPHERE_ACCESS_TOKEN,
		{
			method: 'GET',
			body: JSON.stringify({
				problemId: qu.sphere_id,
				source: src,
				compilerId: lngid,
			}),
			headers: { 'Content-Type': 'application/json' },
		}
	);
});

module.exports = router;
