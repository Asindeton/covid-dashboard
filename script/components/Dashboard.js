import DataService from './DataService';
import SearchElement from './SearchElement';
import Menu from './Menu';
import FullscreenButton from './FullscreenButton';
import FullscreenContainer from './FullscreenContainer';
import GlobalCasesItem from './DashboardItems/GlobalCasesItem';
import CasesByRegionItem from './DashboardItems/CasesByRegionItem';
import GlobalDeathsItem from './DashboardItems/GlobalDeathsItem';
import GlobalRecoveredItem from './DashboardItems/GlobalRecoveredItem';

export default class Dashboard {
  constructor() {
    this.searchElement = new SearchElement();
    this.menu = new Menu();
    this.state = this.getStateFromMenu();
    this.generateDashboard();
    this.addEventsHandlers();

    this.fullscreenContainer = new FullscreenContainer();
    document.querySelector('.main').querySelectorAll('.container').forEach((el) => {
      const fullscreenButton = new FullscreenButton(el, this.fullscreenContainer);
    });
  }

  generateDashboard() {
    this.globalCases = document.querySelector('.global-cases__number');
    this.casesByRegionContainer = document.querySelector('.cases-by .list');
    this.mapContainer = document.querySelector('.map');
    this.chartContainer = document.querySelector('.graph');
    this.globalDeaths = document.querySelector('.global-deaths__number');
    this.globalDeathsContainer = document.querySelector('.global-deaths .list');
    this.globalRecovered = document.querySelector('.global-recovered__number');
    this.globalRecoveredContainer = document.querySelector('.deaths-recovered .list');
  }

  addEventsHandlers() {
    this.handleSearch();
    this.handleState();
  }

  async updateDashboard() {
    const dataService = new DataService('https://api.covid19api.com/summary');
    this.data = await dataService.getData();
    this.dashboardItems = [
      new GlobalCasesItem(this.globalCases, this.fullscreenContainer, this.state, this.data),
      new CasesByRegionItem(this.casesByRegionContainer, this.fullscreenContainer, this.state,
        this.data),
      new GlobalDeathsItem(this.globalDeathsContainer, this.fullscreenContainer, this.state,
        this.data, this.globalDeaths),
      new GlobalRecoveredItem(this.globalRecoveredContainer, this.fullscreenContainer, this.state,
        this.data, this.globalRecovered),
    ];
    this.dashboardItems.forEach((x) => x.updateItemInfo());
    this.handleGridItemClick();
  }

  handleSearch() {
    this.searchElement.results.addEventListener('mousedown', (e) => {
      const eventContainer = e.target.closest('.search__link');
      if (eventContainer) {
        this.menu.region = eventContainer.querySelector('.search__country').innerText;
        this.menu.isCountry = true;
        this.menu.setCountryIndication(this.menu.region);
        this.searchElement.clearResults();
        this.searchElement.clearInput();
        this.searchElement.keyboard.properties.value = '';
        this.searchElement.keyboard.properties.secondValue = '';
        this.searchElement.keyboard.close();
        this.menu.applyButton.dispatchEvent(new Event('mousedown'));
      }
    }, true);
  }

  handleState() {
    this.menu.applyButton.addEventListener('mousedown', () => {
      const state = this.getStateFromMenu();
      console.log(state);
      this.menu.menuEl.classList.remove('menu_active');
      this.dashboardItems.forEach((x) => x.updateItemInfo(null, state));
      this.fullscreenContainer.update();
      this.state = state;
    });
  }

  getStateFromMenu() {
    return this.menu.getState();
  }

  handleGridItemClick() {
    this.dashboardItems.forEach((x) => {
      x.itemContainer.addEventListener('gridItemClick', (event) => {
        this.menu.region = event.detail.country;
        this.menu.isCountry = true;
        this.menu.applyButton.dispatchEvent(new Event('mousedown'));
      });
    });
  }
}
