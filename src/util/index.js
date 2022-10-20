import { rebaseRate } from '../constants/index.js';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function calculate_rebase_for_x_days(value, numDays) {
  if (!value) return 0;
  return value * Math.pow(rebaseRate.with1, numDays * 3);
}
