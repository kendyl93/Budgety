import express from 'express';
import { create, list, show, update } from './controller';

const router = express.Router();

router.get('/', list);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);

export default router;
