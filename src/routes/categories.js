const express = require('express')
const router = express.Router()

const { check } = require('express-validator')
const { validarJWT, validarCampos, isAdminRole } = require('../middlewares')

const { getCategories, 
    getCategoryById,
    crearCategoria, 
    updateCategoria,
    deleteCategory
 } = require('../controllers/categories.controller')

const { categoryExist } = require('../helpers/db-validators')

//obtener todas las categorias - publico
router.get('/', getCategories)


//obtener una categoria por id - publico
router.get('/:id', [
    check('id').custom(categoryExist),
    validarCampos
], getCategoryById)


//crear una categoria - privado - cualquer persona con token valido
router.post('/' , [
    validarJWT,
    check('nombre', 'El nombre es obligatorio'),
    validarCampos,
], crearCategoria)


//actualizar registro por id - privado - con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(categoryExist),
    validarCampos,
], updateCategoria)



//borrar una categoria - admin 
router.delete('/:id', [
    validarJWT,
   // isAdminRole,
    check('id').custom(categoryExist),
    validarCampos
], deleteCategory)


module.exports = router