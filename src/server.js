const express = require("express")
const app = express()
const morgan = require("morgan")
const port = process.env.$PORT || 3000
const cors = require('cors')
const path = require('path')
const { engine }= require('express-handlebars')
const { router } = require('./routes/index.routes')


app.engine('handlebars', engine( { defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views')); 

//middlewars
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//rotas 
app.use('/', router)


//vista publica


//portas
app.listen(port, ()=>{
    console.log(`Escuchando port ${port}`)
})