function numberFormatter(number, stateFormatter, population) {
  if (stateFormatter) {
    return (number * (stateFormatter === 'formatted' ? (100000 / population) : 1));
  }
  return number;
}

function numberFormatterToString(number, stateFormatter, population) {
  return numberFormatter(number, stateFormatter, population).toLocaleString('ru-RU');
}

export { numberFormatterToString, numberFormatter };
