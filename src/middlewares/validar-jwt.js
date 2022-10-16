const { request, response} = require('express')
const  Usuario  = require('../model/usuarios')

const jwt = require('jsonwebtoken')
const usuarios = require('../model/usuarios')

const validarJWT = async (req = request, res = response, next) => {


    const token = req.header('x-token')


    if( !token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }


    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuarioAutenticado = await Usuario.findById({ _id: uid })

        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                msg: 'Usuario esta desactivado'
            })
        }


        //este req.usuario es posible enviarlo al controlador
        req.usuario = usuarioAutenticado
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}