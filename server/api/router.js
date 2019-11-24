import express from 'express';

import expencesRouter from './expences/router';

const router = express.Router();

router.use('/expences', expencesRouter);

export default router;
