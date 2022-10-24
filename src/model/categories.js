const { Schema, model } = require('mongoose');


const SchemaCategories = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }, 
    estado: {
        type: Boolean,
        default: true,
        required: true
    },

    //relacionando categoria con usuario
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


})


module.exports = model('Categorie', SchemaCategories)