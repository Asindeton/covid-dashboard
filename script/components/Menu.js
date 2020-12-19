import parseFormData from '../utils/parseFormData';
import createHtmlElement from '../utils/create';
import countries from './Countries';

export default class Menu {
  constructor() {
    this.menuEl = document.querySelector('.menu');
    this.formEl = document.querySelector('.data-controls');
    this.countryList = document.querySelector('.country-changer__list');
    this.showButton = document.querySelector('.menu__button-show');
    this.closeButton = document.querySelector('.menu__button-close');
    this.applyButton = document.querySelector('.menu__apply');
    this.globalModeButton = document.querySelector('.mode__global');
    this.countryModeButton = document.querySelector('.mode__country');
    this.regionEl = null;
    this.isCountry = false;
    this.fillCountries();
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.showButton.addEventListener('click', () => {
      this.menuEl.classList.add('menu_active');
    });
    this.closeButton.addEventListener('click', () => {
      this.menuEl.classList.remove('menu_active');
    });
    this.applyButton.addEventListener('click', () => {
      this.menuEl.classList.remove('menu_active');
    });
    this.globalModeButton.addEventListener('click', () => {
      this.isCountry = false;
      this.regionEl = this.globalModeButton;
      this.countryList.classList.add('hide');
      this.globalModeButton.classList.add('mode-changer__button_active');
      this.countryModeButton.classList.remove('mode-changer__button_active');
    });
    this.countryModeButton.addEventListener('click', () => {
      this.isCountry = true;
      this.countryList.classList.remove('hide');
      this.globalModeButton.classList.remove('mode-changer__button_active');
      this.countryModeButton.classList.add('mode-changer__button_active');
    });
    this.countryList.addEventListener('mousedown', (e) => {
      const regionEl = e.target.closest('.mode-changer__button');
      if (regionEl) {
        this.regionEl.classList.remove('mode-changer__button_active');
        regionEl.classList.add('mode-changer__button_active');
        this.regionEl = regionEl;
      }
    });
  }

  getState() {
    const formData = parseFormData(new FormData(this.formEl));
    formData.region = this.isCountry ? this.regionEl.value : '';
    return formData;
  }

  fillCountries() {
    countries.forEach((el) => {
      const countryNameEl = createHtmlElement('span', 'country');
      countryNameEl.innerText = el.name;
      createHtmlElement('li', 'list__link country-changer__country', [
        createHtmlElement('button', 'mode-changer__button mode-changer__country', [
          createHtmlElement('img', 'flag flag__mode', null, null, ['src', `https://www.countryflags.io/${el.code}/flat/32.png`]),
          countryNameEl,
        ], null, ['value', el.name]),
      ], this.countryList);
    });
    this.regionEl = this.countryList.firstChild.querySelector('.mode-changer__button');
    this.regionEl.classList.add('mode-changer__button_active');
  }
}