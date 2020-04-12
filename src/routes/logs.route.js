import express from 'express';
import logsController from '../controllers/logs.controller';

const router = express.Router();

router.get('/on-covid-19/logs/', logsController.getLogs);

router.delete('/on-covid-19/logs/', logsController.deleteLogs);

export default router;