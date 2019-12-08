import express from 'express';

import expencesRouter from './expences/router';
import usersRouter from './users/router';
import groupsRouter from './groups/router';

const router = express.Router();

router.use('/expences', expencesRouter);
router.use('/groups', groupsRouter);
router.use('/users', usersRouter);

export default router;
