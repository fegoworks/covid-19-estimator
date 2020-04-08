import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';
import estimateRoute from './routes/estimate.route';

env.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

// add routes here
app.use('/api/v1/', estimateRoute);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});