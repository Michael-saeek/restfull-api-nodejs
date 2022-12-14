const { Schema, model } = require('mongoose');

const SchemaUser = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
});


SchemaUser.methods.toJSON = function() {
	const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id
	return { ...usuario }

}

module.exports = model('Usuario', SchemaUser);
