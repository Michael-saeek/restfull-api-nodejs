const Rol = require('../model/rols')
const Usuario = require('../model/usuarios')
const Categorie = require('../model/categories')

const isRolValid = async (rol = '') => {
    const rolExist = await Rol.findOne({ rol: rol })
    if (!rolExist) {
        throw new Error(`El rol ${rol} no existe ${rolExist}!`)
    }
}

// Verificar si el correo existe y si es unico

const emailExistsonDB = async (email) => {
    const isaEmail = await Usuario.findOne({ email: email })

    if (isaEmail) {
       throw new Error(`El e-mail ya existe ! `)
    } 
}

//Si el id existe pero el usuario es null
const userExists = async (id) => {

    const user = await Usuario.findById(id)
    if (!user) {
        throw new Error('El usuario no existe ! ')
    }
}

const categoryExist = async ( id ) => {

    const category = await Categorie.findOne({_id: id})

    if (!category) {
        throw new Error('El id de esta categoria no existe en nuestra base de datos')
    }
}


module.exports = {
    isRolValid,
    emailExistsonDB,
    userExists,
    categoryExist
}