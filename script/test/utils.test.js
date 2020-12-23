import getCountryCode from '../utils/getCountryCode';
import { numberFormatter, numberFormatterToString } from '../utils/formatter';
import sort from '../utils/sorter';
import DataService from '../components/DataService';
import countries from '../components/Countries';

test('getCountryCode', () => {
  expect(getCountryCode('Belarus', countries)).toBe('BY');
  expect(getCountryCode('Russia', countries)).toBeDefined();
});
test('numberFormatter', () => {
  expect(numberFormatter(512312, 'formatted', 50000)).toBe(1024624);
  expect(numberFormatter(512312, 'formatted', 5000)).toBe(10246240);
  for (let i = 0; i < 1000; i += 10) {
    expect(numberFormatter((i ** i), 'formatted', (i ** i))).toBeDefined();
    expect(numberFormatter((i ** i), 'formatted', i ** (1 / i))).toBeDefined();
  }
});

test('sort', () => {
  expect(sort([1241, 1232, 543, 124, 56457, 52346, 7123, 8], numberFormatter, 50000)).toBeDefined();
});

test('DataService', () => {
  expect(new DataService()).toBeInstanceOf(DataService);
  expect(new DataService()).not.toBeInstanceOf(Function);
});

test('numberFormatterToString', () => {
  expect(typeof numberFormatterToString(12)).toBe('string');
});
