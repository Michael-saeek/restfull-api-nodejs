
const validarCampos = require('../middlewares/validar-campos')
const validarJWT  = require('../middlewares/validar-jwt')
const validarRoles  = require('../middlewares/validar-roles')


// el operador rest es para traernos todas las importaciones caso existan algunas otras en estos archivos

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}