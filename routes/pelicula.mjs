import express from 'express';
import {
    findAll,
    save,
    remove
} from '../controllers/controll-peliculas.mjs';

const router = express.Router();

router.get('/', findAll);
router.post('/', save);
router.delete('/:id', remove);

export default router;
