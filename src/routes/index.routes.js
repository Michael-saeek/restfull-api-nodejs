const express = require('express')
//const path = require('path')
const router = express.Router()

//const dataBase = require('../db')

//middleware use
router.use( function(req, res, next) {
    next()
})

//GET

router.get('/', (req, res) => {
  
    res.render('home', {layout: false})
})

/*
router.get('/allArtists', (req, res) => {

    res.status(200).send(JSON.stringify(dataBase))
})


//POST

router.get('/artists:id', (req, res) => {
    console.log(req.params)

    res.send(req.body)
})

*/

//PUT 


//DELETE

module.exports = { 
    router
};