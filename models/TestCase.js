const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: [true, 'Test Case Number is Required'],
	},

	input: {
		type: String,
		default: '',
	},

	expected: {
		type: String,
		required: [true, 'Expected Output is required'],
	},

	question_id: {
		type: mongoose.Types.ObjectId,
		required: [true, 'The Question this test case belongs to is required'],
	},

	sphere_number: {
		type: String,
		required: [true, 'Sphere API linkage is required'],
	},
});

module.exports = mongoose.model('TestCase', testcaseSchema);
