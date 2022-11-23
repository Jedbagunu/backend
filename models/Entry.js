const mongoose = require('mongoose')

const entry_schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is required.']
	},
	description: {
		type: String,
		required: [true, 'Description is required.']
	},
	reason: {
		type: String,
		required: [true, 'Reason is required.']
	},
	isActive: {
		type: Boolean,
		default: true  
	},
	targetDate: {
		type: String,
		required: [true, 'Date required']
	},
	createdOn: {
		type: Date,
		default: new Date() .toDateString()
	},
	completedOn: {
		type: Date,
		default: new Date() .toDateString()
	},

	entries: [
		{
			userId: {
				type: String,
				required: [true, 'UserID is Required.']
			},
			completedOn: {
				type: Date,
				default: new Date()
			}
		}
	]
	
})

module.exports = mongoose.model('Entry', entry_schema)