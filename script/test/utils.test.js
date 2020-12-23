import { getMarkSize } from '../utils/mapUtils';
import { numberFormatter, numberFormatterToString } from '../utils/formatter';
import sort from '../utils/sorter';
import DataService from '../components/DataService';

test('getMarkSize', () => {
  expect(getMarkSize(1)).toBe(26);
  for (let i = 0; i < 1000; i += 10) {
    expect(getMarkSize(i ** i)).toBeDefined();
    expect(getMarkSize(i ** (1 / i))).toBeDefined();
  }
});
test('numberFormatter', () => {
  expect(numberFormatter(512312, 'formatted', 50000)).toBe(1024624);
  expect(numberFormatter(512312, 'formatted', 5000)).toBe(10246240);
  for (let i = 0; i < 1000; i += 10) {
    expect(getMarkSize((i ** i), 'formatted', (i ** i))).toBeDefined();
    expect(getMarkSize((i ** i), 'formatted', i ** (1 / i))).toBeDefined();
  }
});

test('sort', () => {
  expect(sort([1241, 1232, 52343, 1234, 56457, 52346, 7123, 8], getMarkSize, 50000)).toBeDefined();
});

test('DataService', () => {
  expect(new DataService()).toBeInstanceOf(DataService);
  expect(new DataService()).not.toBeInstanceOf(Function);
});

test('numberFormatterToString', () => {
  expect(numberFormatterToString(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)))).toBe('2012-12-20 6:00:00 AM');
});
