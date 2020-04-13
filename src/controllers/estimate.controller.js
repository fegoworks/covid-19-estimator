import xml from 'xml2js';
import estimator from '../estimator';

const builder = new xml.Builder();

class Estimates {
  /**
   * @description Fetch Impact Estimates
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Array} Estimate
   * @member Estimates
   */
  static covidEstimate(req, res) {
    const {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    } = req.body;

    const {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    } = region;

    const data = {
      region: {
        name,
        avgAge,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };

    const response = estimator(data);

    if (req.path.includes('xml')) {
      res.header('Content-Type', 'application/xml; charset=UTF-8');
      return res.status(201).send(
        builder.buildObject({
          response
        })
      );
    }
    return res.status(201).send({
      data: response.data,
      impact: response.impact,
      severeImpact: response.severeImpact
    });
  }
}

export default Estimates;