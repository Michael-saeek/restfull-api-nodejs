const { Router } = require('express')
const router = Router()

const dataBase = require('../db')

//controllers here
router.use('/', (req, res) => {
    res.render('main')
})


//GET
router.get('/allArtists', (req, res) => {

    res.status(200).send(JSON.stringify(dataBase))
})


//POST

router.get('/artists:id', (req, res) => {
    console.log(req.params)

    res.send(req.body)
})

//PUT 


//DELETE

module.exports = {
    router
}