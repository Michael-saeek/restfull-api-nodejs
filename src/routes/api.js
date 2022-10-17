const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { getUsers, postUsers, usuariosPut, deleteUser } = require('../controllers/usuarios.controller')

const {
    validarJWT,
    isAdminRole,
    validarRoles,
    validarCampos
} = require('../middlewares')

const { isRolValid, emailExistsonDB, userExists } = require('../helpers/db-validators')


router.get('/getusers', getUsers)


router.post('/createuser', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('password', 'El password debe contener mas de 6 letras').isLength({ min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExistsonDB),
    check('rol').custom(isRolValid),

    validarCampos
], postUsers)

router.put('/updateuser/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExists),
    check('rol').custom(isRolValid),
    validarCampos
], usuariosPut)

router.delete('/deleteuser/:id', [
    validarJWT,
   // isAdminRole,
    validarRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExists),
    validarCampos
], deleteUser)

module.exports = router