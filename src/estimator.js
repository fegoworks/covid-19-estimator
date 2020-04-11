import {
  getPeriod,
  iCases,
  numbersInfected,
  infectionsByRequestedTime,
  bedSpaces
} from './helpers/utils';

const covid19ImpactEstimator = (data) => {
  const estimates = {
    data,
    impact: {},
    severeImpact: {}
  };

  const {
    region,
    periodType,
    timeToElapse
  } = data;

  const {
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  const population = avgDailyIncomePopulation;
  const time = getPeriod(periodType, timeToElapse);
  const {
    impact,
    severeImpact
  } = estimates;
  const income = avgDailyIncomeInUSD;

  impact.currentlyInfected = iCases(data, 10);
  estimates.severeImpact.currentlyInfected = iCases(data, 50);
  const infections = numbersInfected(impact, 2 ** Math.trunc(time / 3));
  impact.infectionsByRequestedTime = infections;
  estimates.severeImpact.infectionsByRequestedTime = numbersInfected(
    severeImpact, 2 ** Math.trunc(time / 3)
  );

  // infectionsByRequestedTime
  impact.severeCasesByRequestedTime = infectionsByRequestedTime(impact, 0.15);
  severeImpact.severeCasesByRequestedTime = infectionsByRequestedTime(severeImpact, 0.15);

  // hospitalBedsByRequestedTime
  impact.hospitalBedsByRequestedTime = bedSpaces(data, impact) + 1;
  severeImpact.hospitalBedsByRequestedTime = (
    bedSpaces(data, severeImpact) + 1
  );

  // casesForICUByRequestedTime
  impact.casesForICUByRequestedTime = infectionsByRequestedTime(impact, 0.05);
  severeImpact.casesForICUByRequestedTime = infectionsByRequestedTime(severeImpact, 0.05);

  // casesForVentilatorsByRequestedTime
  impact.casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime(impact, 0.02));
  severeImpact.casesForVentilatorsByRequestedTime = infectionsByRequestedTime(severeImpact, 0.02);

  // dollarsInFlight
  const iImpact = (infectionsByRequestedTime(impact, population) * income) / time;
  impact.dollarsInFlight = Math.trunc(iImpact);
  const sImpact = (infectionsByRequestedTime(severeImpact, population) * income) / time;
  severeImpact.dollarsInFlight = Math.trunc(sImpact);

  return estimates;
};

export default covid19ImpactEstimator;