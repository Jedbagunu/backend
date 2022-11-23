const express = require('express')
const router = express.Router()
const entryController = require('../controllers/entryController')
const auth = require('../auth')


//create product (admin only)
router.post('/createEntry', auth.verify, (request, response)=>{
	const data = {
		entry: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	entryController.createEntry(data).then((result)=>{
		response.send(result)
	})
	
})

//update my product (admin only)
router.patch('/:entryId/update', auth.verify, (request, response)=>{
	const data = {
		entry: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	entryController.updateEntry(request.params.entryId, data).then((result)=>{
		response.send(result)
	})
})



//retrieve all product
router.get('/all', (request, response)=>{
	entryController.allEntry().then((result)=>{
		response.send(result)
	})
})


//retrieve single product
router.get('/:entryId/single', (request, response) => {
	entryController.getEntry(request.params.entryId).then((result)=>{
		response.send(result)
	})
})




//Archive my product
router.patch('/:entryId/archive', auth.verify, (request, response) => {
	const data = {
		entry: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	entryController.archive(request.params.entryId, data).then((result)=>{
		response.send(result)
	})
})

//Retrieve Archived product
router.patch('/:entryId/activate', auth.verify, (request, response) => {
	const data = {
		entry: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin 	
	}
	entryController.activate(request.params.entryId, data).then((result)=>{
		response.send(result)
	})
})

//delete
router.delete('/:entryId/delete', (request, response) => {
	entryController.deleteEntry(request.params.entryId).then((result)=>{
		response.send(result)
	})
})

module.exports = router