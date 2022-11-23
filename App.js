const express = require('express')
const dotenv = require('dotenv')
const mongoose = require ('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const entryRoutes = require('./routes/entryRoutes')


dotenv.config()


const app = express()
const port = 8090

//mgDB connect
mongoose.connect(`mongodb+srv://JEDBAGUNU:${process.env.MONGODB_PASSWORD}@cluster0.bxtf324.mongodb.net/web-app?retryWrites=true&w=majority`,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
let db = mongoose.connection
db.once('open',()=>console.log('Connected to MongoDB!'))
//mgDB end

//to avoid CORS erros when trying to send request to our server
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//Routes
app.use('/users', userRoutes)
app.use('/entries', entryRoutes)

//Routes End



app.listen(process.env.PORT || 8090, () => {
	console.log(`API is now running on localhost:${process.env.PORT || 8090}`)
})