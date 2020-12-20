export default function numberFormatter(number, stateFormatter) {
  if (stateFormatter) {
    return (number / (stateFormatter === 'formatted' ? 100000 : 1)).toLocaleString('ru-RU');
  }
  return number.toLocaleString('ru-RU');
}
