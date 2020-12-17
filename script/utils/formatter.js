export default function numberFormatter(number) {
  const result = [];
  let total = number;
  while (total >= 1) {
    const decimalPart = total % 1000;
    total = Math.trunc(total / 1000);
    if (total >= 1 && decimalPart < 100) {
      let decimalResult = '';
      if (decimalPart < 10) {
        decimalResult += '00';
      } else if (decimalPart < 100) {
        decimalResult += '0';
      }
      decimalResult += decimalPart;
      result.push(decimalResult);
    } else {
      result.push(decimalPart.toString());
    }
  }
  return result.reverse().join(' ');
}
