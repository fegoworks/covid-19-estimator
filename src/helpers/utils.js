import fs from 'fs';

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

export const timeInMilliseconds = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

export const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};