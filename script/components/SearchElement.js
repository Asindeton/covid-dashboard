import countries from './Countries';
import createHtmlElement from '../utils/create';
import VirtualKeyboard from './VirtualKeyboard';

export default class SearchElement {
  constructor() {
    this.searchButton = document.querySelector('.search__button');
    this.input = document.querySelector('.search__input');
    this.results = document.querySelector('.search__results');
    this.keyboard = new VirtualKeyboard();
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
    this.input.addEventListener('search', () => {
      this.keyboard.properties.value = '';
      this.keyboard.properties.secondValue = '';
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

  clearInput() {
    this.input.value = '';
  }

  createLink(name, code) {
    const li = createHtmlElement('li', 'search__link', [
      createHtmlElement('img', 'flag', null, null, ['src', `https://www.countryflags.io/${code}/flat/16.png`]),
    ]);
    const span = createHtmlElement('span', 'search__country');
    span.innerText = name;
    li.appendChild(span);
    this.results.appendChild(li);
  }
}
