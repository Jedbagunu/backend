//IMPORTS
const Entry = require('../models/Entry')
const User = require('../models/User')
const auth = require('../auth')


module.exports.createEntry =(data) => {
	if(data.isAdmin){
		let new_entry = new Entry({
			name:  data.entry.name,
			description: data.entry.description,
			reason: data.entry.reason,
			targetDate: data.entry.targetDate

		})
		return new_entry.save().then((new_entry, error)=>{
			if(error){
				return false
			}
			return {
				message: 'New Entry successfully created!'
			}
		})

	}
	
	let message = Promise.resolve({
		message: 'User must be admin to access this.'
	})

	return message.then((value)=>{
		return value
	})
}


module.exports.allEntry =() => {
		return Entry.find({}).then((result)=>{
			return result
		})
}

//Retrieve single product
module.exports.getEntry = (entryId) => {
	return Entry.findById(entryId).then((result)=>{
		return result
	})
}


module.exports.updateEntry = (entryId, data) => {
	if(data.isAdmin) {
		return Entry.findByIdAndUpdate(entryId, {
			name: data.entry.name,
			description: data.entry.description,
			reason: data.entry.reason,
			targetDate: data.entry.targetDate
		
		}).then((updated_entry, error) => {
			if (error) {
				return false
			}
			return {
				message: 'Entry updated successfully'
			}
		})
	}
		let message = Promise.resolve ({message:'Request for admin access to continue'})
			return message.then((value)=>{
				return value
			})
}


module.exports.archive = (entryId, data) => {
	if(data.isAdmin){
	return Entry.findByIdAndUpdate(entryId, {isActive:false}).then((archive, error) =>{
			if (error) {
				return false
			}
			return {message: 'Entry archived'}
		})
	}		
	let message = Promise.resolve ({message:'Request for admin access'})
			return message.then((value)=>{
				return value
			})
}

module.exports.activate = (entryId, data) => {
	if(data.isAdmin){
	return Entry.findByIdAndUpdate(entryId, {isActive:true}).then((archive, error) =>{
			if (error) {
				return false
			}
			return {message: 'Entry retrieved'}
		})
	}		
	let message = Promise.resolve ({message:'Request for admin access'})
			return message.then((value)=>{
				return value
			})
}

module.exports.deleteEntry = (entryId) => {
	return Entry.findOneAndDelete(entryId).then((result)=>{
		return result
	})
}