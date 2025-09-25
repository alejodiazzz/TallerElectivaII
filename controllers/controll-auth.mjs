import jwt from 'jsonwebtoken';

// Como no hay un modelo de usuario, usamos uno harcodeado para el ejemplo.
const hardcodedUser = {
  username: 'admin',
  password: 'password'
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username === hardcodedUser.username && password === hardcodedUser.password) {

    const payload = {
      username: hardcodedUser.username,
     
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    res.status(200).json({
      message: 'Autenticación exitosa',
      token: token
    });
  } else {
    // Credenciales inválidas
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};
