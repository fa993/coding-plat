const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use(express.static(__dirname + '/public'));

if (!isProduction) {
	app.use(errorhandler());
}

if (isProduction) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(
		process.env.MONGODB_URI || 'mongodb://localhost/coding-plat'
	);
	mongoose.set('debug', true);
}

app.use(cookieParser());
app.use(express.json());

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
	app.use(function (err, req, res, next) {
		console.log(err.stack);

		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
});

app.set('token-whitelist', new Set());

// finally, let's start our server...
var server = app.listen(process.env.PORT || 3000, function () {
	console.log('Listening on port ' + server.address().port);
});
