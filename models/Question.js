const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Question title is required'],
	},

	description: {
		type: String,
		required: false,
	},

	sphere_id: {
		type: String,
		required: [true, 'The Sphere Id is required'],
	},
});

module.exports = mongoose.model('Question', questionSchema);
