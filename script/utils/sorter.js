export default function sort(array, sortByField) {
  array.sort((a, b) => {
    if (sortByField(b) === sortByField(a)) {
      if (a.country > b.country) {
        return 1;
      }
      if (a.country < b.country) {
        return -1;
      }
      return 0;
    }

    if (sortByField(b) > sortByField(a)) {
      return 1;
    }
    if (sortByField(b) < sortByField(a)) {
      return -1;
    }
    return 0;
  });
  return array;
}
