import path from 'path';
import {
  timeInMilliseconds,
  saveToFile
} from '../helpers/utils';

const requestLogger = (req, res, next) => {
  const {
    method,
    url
  } = req;
  const {
    statusCode
  } = res;
  const startTime = process.hrtime();
  const timeInMS = timeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.floor(timeInMS)
    .toString()
    .padStart(2, '00')}ms`;
  const filePath = path.join(__dirname, '../logs.txt');

  saveToFile(message, filePath);
  next();
};

export default requestLogger;