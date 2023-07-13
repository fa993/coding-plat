const router = require('express').Router();
const Question = require('../../../models/Question');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	port: 465,
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.MAIL_ID,
		pass: process.env.MAIL_APP_PSWD,
	},
	secure: true,
});

const SPHERE_API_BASE_SB_URL =
	'https://a328555b.problems.sphere-engine.com/api/v4/submissions';

router.post('/create', async (req, res) => {
	try {
		const { src, lang, question_id } = req.body;
		//fetch the sphere id for the question from the db
		const qu = await Question.findById(question_id);

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
			SPHERE_API_BASE_SB_URL +
				'?access_token=' +
				process.env.SPHERE_ACCESS_TOKEN,
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

		const mailData = {
			from: 'app@gmail.com', // sender address
			to: req.user.email, // list of receivers
			subject: 'Re: Code Submission',
			text: "Here's a copy of your source code",
			html: "Here's a copy of your source code. <br> " + src,
		};

		transporter.sendMail(mailData, function (err, info) {
			if (err) console.log(err);
		});

		res.send('' + data.id);
	} catch (ex) {
		console.log(ex);
		res.sendStatus(404);
	}
});

router.use('/results', require('./results'));

module.exports = router;
