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
    unitsPerPeriod = Math.round(period / 3);
    infections = (infected * 2 ** unitsPerPeriod) / 2;
  } else if (periodType === 'weeks') {
    days = period * 7;
    unitsPerPeriod = Math.round(days / 3);
    infections = infected * 2 ** unitsPerPeriod;
  } else if (periodType === 'months') {
    days = period * 30;
    unitsPerPeriod = Math.round(days / 3);
    infections = infected * 2 ** unitsPerPeriod;
  }
  return infections;
};

export const severeCasesByRequestedTime = ((time) => Math.round(time * 0.15));

export const hospitalBedsByRequestedTime = (data, cases) => {
  const bedsAvailable = data.totalHospitalBeds * 0.35;
  return bedsAvailable - cases;
};