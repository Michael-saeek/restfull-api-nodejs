const bcryptjs = require('bcryptjs')
const Usuario = require('../model/usuarios')

const getUsers = async (req, res) => {

  //paginar resultados por paramsQuerys
  //podemos colocar una validacion en nuestras querys para mayorSeguridad
  const { limite = 5, desde = 10 } = req.query;

  try {
    /*  const queryUsers = await Usuario.find()
        .skip(Number(desde)) // esto es busqueda a partir del usuarioNumerotal
        .limit(Number(limite)) // esto limita lo que nos trae en la Query
      const totalUsers = await Usuario.countDocuments() */

    const [total, usuarios] = await Promise.all([

      Usuario.countDocuments({ estado: true }),
      Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ])


    res.json({
      total,
      usuarios
    });
  } catch (error) {
    console.log(error);
  }
};

const postUsers = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  const newUser = new Usuario({
    nombre,
    email,
    password,
    rol,
  });

  //Guardar en BD
  try {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);
    await newUser.save();
    console.log('Usuario creado con exito !');
  } catch (err) {
    console.log(`Este es el error: ${err}`);
  }

  res.status(201).json({
    msg: 'Usuario creado con exito',
  });
};

const usuariosPut = async (req, res) => {

  const { id } = req.params

  const {
    _id,
    password,
    google,
    email,
    ...rest
  } = req.body

  // actualizar password, si dentro del body existe password
  // Es posible que quiera actualizar la contrasena
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // validar contra db, busca por ID y actualiza talDatos
  const userUpdated = await Usuario.findByIdAndUpdate(id, rest)


  return res.status(201).json({
    msg: 'Hi from server - PUT !',
    userUpdated
  })
}

const deleteUser = async (req, res) => {

  const { id } = req.params

  // borrar fisicamente 
  // const usuarioDeleted = await Usuario.findByIdAndDelete(id)

  const usuarioDeleted = await Usuario.findByIdAndUpdate(id, { estado: false })
  const userAuthenticated = req.usuario
  
  res.status(202).json({
    usuarioAutenticado: userAuthenticated.nombre,
    rol: userAuthenticated.rol,
    usuarioDeleted
  })
}



module.exports = {
  getUsers,
  postUsers,
  usuariosPut,
  deleteUser
};
