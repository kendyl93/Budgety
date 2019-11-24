import express from 'express';

import expencesRouter from './expences/router';
import usersRouter from './users/router';

const router = express.Router();

router.use('/expences', expencesRouter);
router.use('/users', usersRouter);

export default router;
