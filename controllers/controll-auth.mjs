import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.mjs'; // Importar el modelo de Usuario

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la DB
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, crear el payload para el token
    const payload = {
      id: user._id,
      username: user.username,
    };

    // Firmar el token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // Enviar la respuesta con el token
    res.status(200).json({
      message: 'Autenticación exitosa',
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
