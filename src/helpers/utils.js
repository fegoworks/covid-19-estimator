/* eslint-disable import/prefer-default-export */
import Big from 'big.js';

export const infectionsByRequestedTime = (data, infected) => {
  let infections = null;
  const { timeToElapse, periodType } = data;

  const period = Big(timeToElapse);
  let days;
  let unitsPerPeriod;

  if (periodType === 'weeks') {
    days = period * 7;
    unitsPerPeriod = Math.round(days / 3);
    infections = infected * 2 ** unitsPerPeriod;
  } else if (periodType === 'months') {
    days = period * 30;
    unitsPerPeriod = Math.round(days / 3);
    infections = infected * 2 ** unitsPerPeriod;
  } else {
    unitsPerPeriod = Math.round(period / 3);
    infections = infected * 2 ** unitsPerPeriod;
  }
  return infections;
};
