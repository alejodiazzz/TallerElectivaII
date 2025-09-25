import express from 'express';
import { register } from '../controllers/controll-usuarios.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoint para registro de usuarios.
 */

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevo_usuario"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error en la solicitud (ej. usuario ya existe).
 */
router.post('/register', register);

export default router;