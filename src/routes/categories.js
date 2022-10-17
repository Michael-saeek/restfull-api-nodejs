const express = require('express')
const router = express.Router()

const { check } = require('express-validator')
const { validarJWT } = require('../middlewares')

const { getCategories, crearCategoria,  } = require('../controllers/categories.controller')

//obtener todas las categorias - publico
router.get('/', getCategories)


//obtener una categoria por id - publico


//crear una categoria - privado - cualquer persona con token valido
router.post('/' , [
    validarJWT,
    check('nombre', 'El nombre es obligatorio'),
], crearCategoria)


//actualizar registro por id - privado - con token valido


//borrar una categoria - admin 




module.exports = router