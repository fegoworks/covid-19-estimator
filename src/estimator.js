import Big from 'big.js';
import infectionsByRequestedTime from './helpers/utils';

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let { reportedCases } = data;

  reportedCases = Big(reportedCases);

  impact.currentlyInfected = reportedCases * Big(10);
  severeImpact.currentlyInfected = reportedCases * Big(50);

  const impactCurrentlyInfected = Big(impact.currentlyInfected);
  impact.infectionsByRequestedTime = infectionsByRequestedTime(
    data,
    impactCurrentlyInfected
  );
  const sICurrentlyInfected = Big(severeImpact.currentlyInfected);
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(
    data,
    sICurrentlyInfected
  );

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
