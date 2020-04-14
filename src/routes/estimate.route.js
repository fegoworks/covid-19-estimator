import express from 'express';
import validate from '../middleware/validator';
import estimateController from '../controllers/estimate.controller';

const router = express.Router();

router.get('/on-covid-19', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome to the Covid 19 Estimator API'
  });
});

router.post(
  '/on-covid-19/',
  validate.validateBody(validate.schemas.paramSchema),
  estimateController.covidEstimate
);

router.post(
  '/on-covid-19/json',
  validate.validateBody(validate.schemas.paramSchema),
  estimateController.covidEstimate
);

router.post(
  '/on-covid-19/xml',
  validate.validateBody(validate.schemas.paramSchema),
  estimateController.covidEstimate
);

export default router;