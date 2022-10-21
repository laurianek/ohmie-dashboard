import { rebaseRate } from '../constants/index.js';
import { formatDistance, intervalToDuration } from 'date-fns';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function calculate_rebase_for_x_days(value, numDays) {
  if (!value) return 0;
  return value * Math.pow(rebaseRate.with1, numDays * 3);
}

export function calculate_bond_return(value, bondPrice) {
  if (!bondPrice || !value) return 0;
  return (1 * value) / bondPrice;
}

export function calculate_percent_return_bond_vs_staking(
  value,
  bondPrice,
  numDays
) {
  if (!value) return 0;
  const stakingReturn = calculate_rebase_for_x_days(value, numDays);
  const bondReturn = calculate_bond_return(value, bondPrice);
  return (bondReturn * 100) / stakingReturn - 100;
}

export function getIntervalFromNow({ timestamp, date }) {
  return intervalToDuration({
    start: new Date(),
    end: date || new Date(timestamp * 1000),
  });
}

export function getFormatIntervalFromNow({ timestamp, date }) {
  return formatDistance(date || new Date(timestamp * 1000), new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });
}

export function numberWithCommas(x) {
  if (!x) return x;
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
