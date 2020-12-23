export default function getCountryCode(countryName, countries) {
  return countries.filter((el) => el.name === countryName)[0].code;
}
