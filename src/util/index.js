import { rebaseRate } from '../constants/index.js';

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
  return (bondReturn * 100) / stakingReturn;
}
