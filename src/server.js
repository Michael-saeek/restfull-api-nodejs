require('dotenv').config()  
/* con esta configuración podemos tener acesso a las variables de ambientes */ 

const express = require("express")
const app = express()
const morgan = require("morgan")
const port = process.env.PORT || 8080
const cors = require('cors')
const path = require('path')
const { engine }= require('express-handlebars')
const { dbConnnection } = require('./database/config')

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
app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth'))
app.use('/api/categories', require('./routes/categories'))

//vista publica
app.use(express.static(path.join(__dirname, 'public')))


//Conexion a la base de datos

dbConnnection();

//ports
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})