const Categorie = require('../model/categories')


const getCategories = async (req, res) => {

    const { since, limit = 10 } = req.query

    /*
    const queryCategories = await Categorie.find()
        .skip(Number(since))
        .limit(Number(limit))
    const countCategories = await Categorie.countDocuments()
    */

    const [ categories, total ] = await Promise.all([

        await Categorie.find({ estado: true})
        .skip(Number(since))
        .limit(Number(limit)),
        await Categorie.countDocuments({ estado: true})
        
    ])

    return res.status(200).json({
        categories,
        total
    })
}

const getCategoryById = async (req, res) => {

    const { id } = req.params

    const queryCategoryById = await Categorie.findOne({ id })

    return res.status(200).json({
        queryCategoryById,
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

    //Generar la data a guardar
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

const updateCategoria = async (req, res) => {

    const { id } = req.params
    const { categoria } = req.body
    const usuarioAutenticado = req.usuario 

  
    if (!categoria) {
        return res.status(400).json({
            msg: "No esta siendo recibido un parametro valido desde el cliente",
        })
    }

    try {

        const newCategory = await Categorie.findByIdAndUpdate(id, { nombre: categoria})
        return res.status(201).json({

            newCategory,
            user: `La categoria ha sido actualizada a ${categoria} ` ,
            userAuthenticated: usuarioAutenticado.nombre,
        })

    } catch (error) {
        return res.status(401).json({
            msg: error
        })
    }

}

const deleteCategory = async (req, res) => {

    const { id } = req.params
  
    try {

        const dataDeleted = await Categorie.findByIdAndUpdate(id, { estado: false })

        return res.status(201).json({
            msg: 'Category deleted',
            dataDeleted,
        })

    } catch (error) {
         return res.status(401).json({
            msg: error
        })
    }

}

module.exports = {
    getCategories,
    getCategoryById,
    crearCategoria,
    updateCategoria,
    deleteCategory
    
}