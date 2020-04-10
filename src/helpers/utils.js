/* eslint-disable import/prefer-default-export */
import Big from 'big.js';

export const infectionsByRequestedTime = (data, infected) => {
  let infections = null;
  const {
    timeToElapse,
    periodType
  } = data;

  const period = Big(timeToElapse);
  let days;
  let unitsPerPeriod;

  if (periodType === 'days') {
    unitsPerPeriod = Math.trunc(period / 3);
    infections = (infected * (2 ** unitsPerPeriod));
  } else if (periodType === 'weeks') {
    days = period * 7;
    unitsPerPeriod = Math.trunc(days / 3);
    infections = (infected * (2 ** unitsPerPeriod));
  } else if (periodType === 'months') {
    days = period * 30;
    unitsPerPeriod = Math.trunc(days / 3);
    infections = (infected * (2 ** unitsPerPeriod));
  }
  return infections;
};

export const severeCasesByRequestedTime = (time) => Math.trunc(time * 0.15);

export const casesForICUByRequestedTime = (time) => time * 0.05;

export const casesForVentilatorsByRequestedTime = (time) => time * 0.02;

export const hospitalBedsByRequestedTime = (data, cases) => {
  const bedsAvailable = data.totalHospitalBeds * 0.35;
  return bedsAvailable - cases;
};

export const dollarsInFlight = (data, infections) => {
  let totalDollars;
  let timeInDays;
  const {
    periodType,
    timeToElapse
  } = data;
  const {
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD
  } = data.region;

  if (periodType === 'weeks') {
    timeInDays = timeToElapse * 7;
    totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
  } else if (periodType === 'months') {
    timeInDays = timeToElapse * 30;
    totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
  } else {
    timeInDays = timeToElapse;
    totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
  }
  return totalDollars;
};