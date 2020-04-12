import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';
import estimateRoute from './routes/estimate.route';
import logsRoute from './routes/logs.route';
import logger from './middleware/logger.middleware';

env.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(logger);

// add routes here
app.use('/api/v1/', estimateRoute);
app.use('/api/v1/', logsRoute);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});