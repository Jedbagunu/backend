const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
firstName: {
		type: String,
		required: [true, "First Name is required."]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required."]
	},
	email: {
		type: String,
		required: [true, "Email is required."]
	},
	password: {
		type: String,
		required: [true, "Password is required."]
	},
	isAdmin: {
		type: Boolean,
		default: true
	},
	mobileNo: {
		type: String,
		required: [true, 'Mobile Number is required.']
	},
	entries: [
	{
			entryId: {
				type: String,
				required: [true, 'entryId is required.']
			},
			completedOn: {
				type: Date,
				default: new Date()
			},
			status: {
				type: String,
				default: "Ongoing"
			}
		}
			
	]
})

module.exports = mongoose.model('User', user_schema)

