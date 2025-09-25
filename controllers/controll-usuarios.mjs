import Usuario from '../models/Usuario.mjs';

async function register(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ "state": false, "error": "Username and password are required" });
        }

        const existingUser = await Usuario.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ "state": false, "error": "Username already exists" });
        }

        const usuario = new Usuario({ username, password });
        const result = await usuario.save();
        
        // No devolver el password en la respuesta
        result.password = undefined;

        res.status(201).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

export {
    register
};