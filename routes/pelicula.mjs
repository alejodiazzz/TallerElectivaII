import express from 'express';
import {
    findAll,
    findById,
    save,
    update,
    remove
} from '../controllers/controll-peliculas.mjs';
import { verifyToken } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pelicula:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB.
 *           example: "60c72b2f9b1d8c001f8e4d2b"
 *         titulo:
 *           type: string
 *           description: Título de la película.
 *           example: "Inception"
 *         genero:
 *           type: string
 *           description: Género de la película.
 *           example: "Ciencia Ficción"
 *         cineId:
 *           $ref: '#/components/schemas/Cine'
 *     PeliculaInput:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título de la película.
 *           example: "Inception"
 *         genero:
 *           type: string
 *           description: Género de la película.
 *           example: "Ciencia Ficción"
 *         cineId:
 *           type: string
 *           description: ID del cine donde se proyecta la película.
 *           example: "60c72b2f9b1d8c001f8e4d2a"
 */

/**
 * @swagger
 * tags:
 *   name: Peliculas
 *   description: Endpoints para la gestión de películas.
 */

/**
 * @swagger
 * /api/peliculas:
 *   get:
 *     summary: Obtiene una lista de todas las películas.
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
router.get('/', verifyToken, findAll);

/**
 * @swagger
 * /api/peliculas/{id}:
 *   get:
 *     summary: Obtiene una película por su ID.
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a obtener.
 *     responses:
 *       200:
 *         description: Película obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       404:
 *         description: Película no encontrada.
 */
router.get('/:id', verifyToken, findById);

/**
 * @swagger
 * /api/peliculas:
 *   post:
 *     summary: Crea una nueva película.
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       201:
 *         description: Película creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 */
router.post('/', verifyToken, save);

/**
 * @swagger
 * /api/peliculas/{id}:
 *   put:
 *     summary: Actualiza una película existente.
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       404:
 *         description: Película no encontrada.
 */
router.put('/:id', verifyToken, update);

/**
 * @swagger
 * /api/peliculas/{id}:
 *   delete:
 *     summary: Elimina una película por su ID.
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a eliminar.
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente.
 *       404:
 *         description: Película no encontrada.
 */
router.delete('/:id', verifyToken, remove);

export default router;
