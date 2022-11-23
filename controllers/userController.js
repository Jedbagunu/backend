//IMPORTS
const User = require('../models/User')
const Entry = require('../models/Entry')

const bcrypt = require('bcrypt')
const auth = require('../auth')

//check email 
module.exports.checkIfEmailExists = (data) => {
		return User.findOne({email: data.email}).then((result)=>{
		if(result !== null){ 
			return {
				message: "User already exist!"
			}
		}
		return {
			message: 'Email is available to use, please proceed'
		}
	})
}

//register a user
module.exports.register = (data) => { 
	let encrypted_password = bcrypt.hashSync(data.password, 10)
	let new_user = new User({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		mobileNo: data.mobileNo,
		password: encrypted_password
	})	
	return new_user.save().then((created_user, error)=>{
		if(error){
			return false
		}
		return {

			message: 'User successfully registered!'
		}

	})
}

//login user
module.exports.login = (data) => {
	return User.findOne({email: data.email}).then((result)=>{
		if(result == null ){ 
			return {
				message: "User doesn't exist!"
			}
		} 
		const is_password_correct = bcrypt.compareSync(data.password, result.password)
		 if(is_password_correct){
		 	return {
		 		access: auth.createAccessToken(result)
		 	}
		 }
		 return {
		 	message: 'Password incorrect!'
		 }
	})

}
module.exports.getProfile = (user_id) => {
	console.log(user_id)
	return User.findById(user_id.userId).then(result => {
		console.log(user_id)
		// Makes the password not be included in the result
		result.password = "";

		// Returns the user information with the password as an empty string
		return result;

	});
};
//get all user
module.exports.getAllUsers =() => {
		return User.find({}).then((result)=>{
			return result
		})
}
/*//get single user
module.exports.getUser = (user_Id) => {
	return User.findById(user_Id).then((result)=>{
		return result
	})
}*/
//admin login
module.exports.admin = (data) => {
		if (data.isAdmin) {
		return User.findOne({email: data.email}).then((result)=>{
			return {
				message: 'welcome admin'
			}
		})
	}
		return Promise.resolve({
			message: 'You are not admin'
	})
}


//Set a user to admin (get user ID)
module.exports.setToAdmin = (user_Id, new_data) => {
	return User.findByIdAndUpdate(user_Id).then((result, error) =>{
		if (error) {
			console.log(error)
				return false
			}
			result.isAdmin = new_data.isAdmin
			return result.save().then((updated_user, error) => {
				if (error) {
					console.log(error)
					return error
				}
			
				return {
					message: 'This User is now admin'
				}
		})
	})
		
}
//create order 
module.exports.createOrder = async (data) => {
	let is_user_updated = await User.findById(data.userId).then((user) => {
		user.entries.push({
			entryId: data.entryId
		})
		return user.save().then((updated_user, error) => {
			if(error){
				return false
			}
			return true
		}) 
	})
	let is_product_updated = await Entry.findById(data.entryId).then((entry) => {
		entry.entries.push({
			userId: data.userId
		})
		return entry.save().then((updated_entry, error) => {
			if(error){
				return false
			}
			return true
		}) 
	})
	
}

//retrieve all Orders
module.exports.allOrders =(data) => {
	if (data.isAdmin) {
		return User.find({}).then((result)=>{
			return result
		})
	}
	let message = Promise.resolve ({message:'Request for admin access'})
			return message.then((value)=>{
				return value
			})
		
}

//Retrieve order
module.exports.retrieveOrder = (userId, data) => {
		return User.find(userId.orders).then((result)=>{
		return result

})
}

module.exports.getEntry = (entryId) => {
	return Entry.findById(entryId).then((result)=>{
		return result
	})
}
