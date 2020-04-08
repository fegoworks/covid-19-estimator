import Big from 'big.js';
import {
  infectionsByRequestedTime,
  severeCasesByRequestedTime,
  hospitalBedsByRequestedTime
} from './helpers/utils';

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let {
    reportedCases
  } = data;

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

  impact.severeCasesByRequestedTime = severeCasesByRequestedTime(impact.infectionsByRequestedTime);
  const infections = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = severeCasesByRequestedTime(infections);

  const impactSevereCases = impact.severeCasesByRequestedTime;
  const sISevereCases = severeImpact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, impactSevereCases);
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, sISevereCases);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;