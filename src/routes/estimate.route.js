import express from 'express';
import estimateController from '../controllers/estimate.controller';

const router = express.Router();

router.post('/on-covid-19/', estimateController.covidEstimate);

export default router;