const express = require("express")
const app = express()
const morgan = require("morgan")
const port = process.env.$PORT || 8080
const cors = require('cors')
const path = require('path')
const { engine }= require('express-handlebars')
const { router } = require('./routes/index.routes')

//settings

app.engine('.hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views',  path.join(__dirname, 'views'))

//middlewars
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//rotas 
app.use('/', router)


//vista publica
app.use(express.static(path.join(__dirname, 'public')))

//ports
app.listen(port, () => {
    console.log(`Escuchando port ${port}`)
})