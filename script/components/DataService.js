export default class DataService {
  constructor(uri) {
    this.uri = uri;
  }

  async getData() {
    if (!this.uri) {
      return [];
    }
    const response = await fetch(this.uri);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    console.log(`Error ${response}`);
    return [];
  }

  // async getDataForCountries() {
  //   return this.getData('https://api.covid19api.com/summary');
  // }
}
