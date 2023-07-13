const router = require('express').Router();
const Question = require('../../../models/Question');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
	const id = req.query.id;

	const response = await fetch(
		SPHERE_API_BASE_SB_URL +
			'/' +
			id +
			'?access_token=' +
			process.env.SPHERE_ACCESS_TOKEN,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		console.log(await response.text());
		return res.sendStatus(500);
	}

	const data = await response.json();

	if (data.executing) {
		//still executing
		res.sendStatus(202);
	} else {
		//we will reuse the same codes that Sphere API uses for status
		res
			.status(200)
			.json({ time: data.result.time, status: data.result.status });
	}
});

module.exports = router;
