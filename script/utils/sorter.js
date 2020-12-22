import { numberFormatter } from './formatter';

export default function sort(array, sortByField, statePopulation) {
  array.sort((a, b) => {
    const fieldB = numberFormatter(sortByField(b), statePopulation, b.population);
    const fieldA = numberFormatter(sortByField(a), statePopulation, a.population);
    if (fieldB === fieldA) {
      if (a.country > b.country) {
        return 1;
      }
      if (a.country < b.country) {
        return -1;
      }
      return 0;
    }
    if (fieldB > fieldA) {
      return 1;
    }
    if (fieldB < fieldA) {
      return -1;
    }
    return 0;
  });
  return array;
}
