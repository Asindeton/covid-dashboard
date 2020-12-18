import countries from './Countries';

export default class SearchElement {
  constructor() {
    this.searchButton = document.querySelector('.search__button');
    this.input = document.querySelector('.search__input');
    this.results = document.querySelector('.search__results');
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.input.addEventListener('input', () => {
      this.fillResults(this.input.value);
    });
    this.input.addEventListener('focus', () => {
      this.fillResults(this.input.value);
    });
    this.input.addEventListener('blur', () => {
      this.clearResults();
    });
    this.searchButton.addEventListener('click', () => {
      this.fillResults(this.input.value);
    });
  }

  fillResults(input) {
    this.clearResults();
    if (input !== '') {
      const matchingCountries = SearchElement.match(input);
      matchingCountries.forEach((el) => {
        this.createLink(el.name, el.code);
      });
    }
  }

  static match(input) {
    const regexp = new RegExp(`${input}`, 'i');
    return countries.filter((el) => regexp.test(el.name));
  }

  clearResults() {
    this.results.innerHTML = '';
  }

  createLink(name, code) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.classList.add('flag');
    li.classList.add('search__link');
    img.src = `https://www.countryflags.io/${code}/flat/16.png`;
    li.appendChild(img);
    li.insertAdjacentText('beforeend', name);
    this.results.appendChild(li);
  }
}
