const mongoose = require('mongoose')
const URIaddress = process.env.MONGO_DB_ATLAS

/*
mongodb+srv://michaeladmin:24931722mmm@clusteritemsarts.ubdc5.mongodb.net/test
*/


const dbConnnection = async () => {

    console.log(typeof URIaddress, + " ", URIaddress)

    try {
        await mongoose.connect(URIaddress, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
  
        })
        console.log('Base de datos online')
    } 
    catch (err) {
        console.log(`Error al iniciar la base de datos: ${err}`)
    }

    
}

module.exports = {
    dbConnnection
}