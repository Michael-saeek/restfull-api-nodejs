const Usuario = require('../model/usuarios')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ email })

        if( !usuario ) {
            return res.status(400).json({
                msg: "Email / password no coincide !"
            })
        }

        // si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: "Usuario eliminado de la base de datos ! "
            })
        }

        // si la contrasena 
        const validPassword = await bcryptjs.compareSync(password, usuario.password)
        if( !validPassword) {
            return res.status(400).json({
                msg: "Password incorrecta, ingrese una contrasena valida ! "
            })
        }


        //Generar el JWT
        const token = await generarJWT(usuario._id)
        return res.status(200).json({
            msg: `Authentication is success, welcome ${usuario.nombre}`,
            token,
        })

    } catch (error) {
        console.log(Error)

        return res.status(500).json({
            msg: 'Hable con el administrador ',
            error,
           
        })
    }
}

module.exports = {
    login
}