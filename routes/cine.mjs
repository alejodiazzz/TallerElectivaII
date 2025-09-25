import express from 'express';
import {
    findAll,
    findById,
    save,
    update,
    remove
} from '../controllers/controll-cines.mjs';
import { verifyToken } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cine:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB.
 *           example: "60c72b2f9b1d8c001f8e4d2a"
 *         nombre:
 *           type: string
 *           description: Nombre del cine.
 *           example: "CineMark"
 *         ciudad:
 *           type: string
 *           description: Ciudad donde se encuentra el cine.
 *           example: "Bogotá"
 *         peliculas:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de las películas asociadas a este cine.
 *           example: ["60c72b2f9b1d8c001f8e4d2b"]
 *     CineInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del cine.
 *           example: "CineMark"
 *         ciudad:
 *           type: string
 *           description: Ciudad donde se encuentra el cine.
 *           example: "Bogotá"
 */

/**
 * @swagger
 * tags:
 *   name: Cines
 *   description: Endpoints para la gestión de cines.
 */

/**
 * @swagger
 * /api/cines:
 *   get:
 *     summary: Obtiene una lista de todos los cines.
 *     tags: [Cines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cines obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cine'
 */
router.get('/', verifyToken, findAll);

/**
 * @swagger
 * /api/cines/{id}:
 *   get:
 *     summary: Obtiene un cine por su ID.
 *     tags: [Cines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine a obtener.
 *     responses:
 *       200:
 *         description: Cine obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cine'
 *       404:
 *         description: Cine no encontrado.
 */
router.get('/:id', verifyToken, findById);

/**
 * @swagger
 * /api/cines:
 *   post:
 *     summary: Crea un nuevo cine.
 *     tags: [Cines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CineInput'
 *     responses:
 *       201:
 *         description: Cine creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cine'
 */
router.post('/', verifyToken, save);

/**
 * @swagger
 * /api/cines/{id}:
 *   put:
 *     summary: Actualiza un cine existente.
 *     tags: [Cines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CineInput'
 *     responses:
 *       200:
 *         description: Cine actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cine'
 *       404:
 *         description: Cine no encontrado.
 */
router.put('/:id', verifyToken, update);

/**
 * @swagger
 * /api/cines/{id}:
 *   delete:
 *     summary: Elimina un cine por su ID.
 *     tags: [Cines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine a eliminar.
 *     responses:
 *       200:
 *         description: Cine eliminado exitosamente.
 *       404:
 *         description: Cine no encontrado.
 */
router.delete('/:id', verifyToken, remove);

export default router;
