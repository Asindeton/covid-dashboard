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
    return [];
  }
}
