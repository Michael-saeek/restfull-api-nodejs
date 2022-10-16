const { response } = require("express")

const isAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Es un error del server'
        })
    }

    const { rol, nombre } = req.usuario

    //si rol es diferente al que queremos evaluar 
    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no posee un rol valido`
        })
    }

    next();
}


const validarRoles = (...rest) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'El server no reconoce un usuario existente, error server !'
            })
        }
    
        const { rol, nombre } = req.usuario 

        // Validar mas de un rol
        if( !rest.includes(rol) ) {
            return res.status(401).json({
                msg: `${nombre} no posee un rol valido`
            })
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    validarRoles,
}