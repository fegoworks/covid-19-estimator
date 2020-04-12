import express from 'express';
import validate from '../middleware/validator';
import estimateController from '../controllers/estimate.controller';

const router = express.Router();

router.post('/on-covid-19/',
  validate.validateBody(validate.schemas.paramSchema),
  estimateController.covidEstimate);

export default router;