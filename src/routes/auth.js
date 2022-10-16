const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos')


router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos,
], login)


module.exports = router