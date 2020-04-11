export const iCases = (data, num) => data.reportedCases * num;

export const numbersInfected = (data, num) => data.currentlyInfected * num;

export const bedSpaces = (beds, data) => {
  const bedsAvailable = Math.trunc(beds.totalHospitalBeds * 0.35);
  const cases = data.severeCasesByRequestedTime;
  return bedsAvailable - cases;
};

export const infectionsByRequestedTime = (cases, num) => cases.infectionsByRequestedTime * num;

export const getPeriod = (periodType, timeToElapse) => {
  let time = periodType;
  time = periodType.toLowerCase();
  switch (time) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return 'Invalid period type';
  }
};