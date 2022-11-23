const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../auth')

//Check if email exists
router.post('/check-email', (request, response)=>{ 
	userController.checkIfEmailExists(request.body).then((result)=>{
		response.send(result)
	})
})

router.get("/details", auth.verify, (request, response) => {

	// Retrieves the user data from the token
	const user_data = auth.decode(request.headers.authorization);
	
	// Provides the user's ID for the getProfile controller method
	userController.getProfile({userId : user_data.user_id}).then(result => response.send(result));

})

//Register new user
router.post('/register',(request, response)=>{
	userController.register(request.body).then((result)=>{
		response.send(result)
	})
})

//user login
router.post('/login',(request, response)=>{
	userController.login(request.body).then((result)=>{
		response.send(result)
	}) 
})
// get all users
router.get('/', (request, response)=>{
	userController.getAllUsers().then((result)=>{
		response.send(result)
	})
})
/*//get single user
router.get('/:userId', (request, response) => {
	userController.getUser(request.params.userId).then((result)=>{
		response.send(result)
	})
})*/
//admin login
router.post('/admin', auth.verify, (request, response)=>{
	let data = {
		email: request.body.email,
		password:request.body.password,
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	userController.admin(data).then((result) => {
		response.send(result)
	})
	
})


//Set to admin
router.patch('/:userId/update', auth.verify, (request, response)=>{
	userController.setToAdmin(request.params.userId, request.body).then((result)=>{
		response.send(result)
	})
})

//create order
	router.post('/create',  (request, response)=>{
	const data = {
		userId: request.body.userId,
		entryId: request.body.entryId
					
	}
	userController.createOrder(data).then((result)=>{
		response.send(result)

	})
	
})

//retrieve all orders
router.get('/allOrders', auth.verify, (request, response)=>{
	const data = {
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	userController.allOrders(data).then((result)=>{
		response.send(result)
	})
})



//retrieve order
router.get('/order', (request, response) => {
		const data = {
		
		userId: request.body.userId	
	}
	userController.retrieveOrder(data).then((result)=>{
		response.send(result)
	})
})
 





module.exports = router


