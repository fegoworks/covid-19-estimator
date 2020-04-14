import path from 'path';
import fs from 'fs';
import logger from '../middleware/logger.middleware';

class Logs {
  /**
   * @description Fetch Logs
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {text} Log
   * @member Logs
   */
  static getLogs(req, res) {
    try {
      const filePath = path.join(__dirname, '../logs.txt');
      const data = fs.readFileSync(filePath, 'utf8');
      res.header('Content-Type', 'text/plain; charset=UTF-8');
      res.status(200).send(data);
    } catch (error) {
      throw new Error('Error reading the logs');
    }
  }

  /**
   * @description Delete Logs
   * @static
   * @param {object} req
   * @param {object} res
   * @returns void
   * @member Logs
   */
  static deleteLogs(req, res) {
    try {
      const filePath = path.join(__dirname, '../logs.txt');
      fs.unlinkSync(filePath);
      logger(req, res, () => {});
      res.status(201).send({
        message: 'logs deleted'
      });
    } catch (error) {
      throw new Error('Error deleting the logs');
    }
  }
}

export default Logs;