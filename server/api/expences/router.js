import express from 'express';
import { create, list, remove, show, update } from './controller';

const router = express.Router();

router.get('/', list);
router.get('/:id', show);
router.post('/add', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
