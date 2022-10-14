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
	const { __v, password, ...usuario } = this.toObject();
    const [ key, value ] = Object.entries(usuario._id)
    key = 'uid'

	return usuario

}

module.exports = model('Usuario', SchemaUser);
