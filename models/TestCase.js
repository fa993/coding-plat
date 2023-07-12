const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: [true, 'Test Case Number is Required'],
	},

	expected: {
		type: String,
		required: [true, 'Expected Output is required'],
	},

	question_id: {
		type: mongoose.Types.ObjectId,
		required: [true, 'The Question this test case belongs to is required'],
	},
});

module.exports = mongoose.model('TestCase', testcaseSchema);
