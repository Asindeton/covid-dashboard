export default function numberFormatter(number, stateFormatter, population) {
  if (stateFormatter) {
    return (number * (stateFormatter === 'formatted' ? (100000 / population) : 1)).toLocaleString('ru-RU');
  }
  return number.toLocaleString('ru-RU');
}
