const Categorie = require('../model/categories')


const getCategories = (req, res) => {

    return res.status(200).json({
        msg: 'hi from  - GET'
    })
}

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaExist = await Categorie.findOne({ nombre })

    //verificar si categoria existe
    if( categoriaExist ) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe, intente crear una nueva! `
        })
    }

    // data a guardar
    const nuevaCategoria = new Categorie({
        nombre,
        usuario: req.usuario._id
    })

    const categoria = await nuevaCategoria.save()

    return res.status(201).json({
        msg: `Nueva categoria creada !`,
        categoria,
    })


}

module.exports = {
    getCategories,
    crearCategoria
    
}