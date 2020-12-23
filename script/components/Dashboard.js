import DataService from './DataService';
import SearchElement from './SearchElement';
import Menu from './Menu';
import FullscreenButton from './FullscreenButton';
import FullscreenContainer from './FullscreenContainer';
import GlobalCasesItem from './DashboardItems/GlobalCasesItem';
import CasesByRegionItem from './DashboardItems/CasesByRegionItem';
import GlobalDeathsItem from './DashboardItems/GlobalDeathsItem';
import GlobalRecoveredItem from './DashboardItems/GlobalRecoveredItem';
import GlobalMapItem from './DashboardItems/GlobalMapItem';
import GlobalChartItem from './DashboardItems/GlobalChartItem';

export default class Dashboard {
  constructor() {
    this.globalCases = document.querySelector('.global-cases__number');
    this.casesByRegionContainer = document.querySelector('.cases-by .list');
    this.mapContainer = document.querySelector('.map');
    this.chartContainer = document.querySelector('.graph');
    this.globalDeaths = document.querySelector('.global-deaths__number');
    this.globalDeathsContainer = document.querySelector('.global-deaths .list');
    this.globalRecovered = document.querySelector('.global-recovered__number');
    this.globalRecoveredContainer = document.querySelector('.deaths-recovered .list');
    this.searchElement = new SearchElement();
    this.menu = new Menu();
    this.state = this.getStateFromMenu();
    this.addEventsHandlers();
  }

  async generateDashboard() {
    const dataService = new DataService('https://corona.lmao.ninja/v2/countries');
    this.data = await dataService.getData();
    this.data.Global = {};
    this.data.forEach((x) => {
      this.data.Global.todayCases = (this.data.Global.todayCases || 0) + (x.todayCases || 0);
      this.data.Global.cases = (this.data.Global.cases || 0) + (x.cases || 0);
      this.data.Global.todayDeaths = (this.data.Global.todayDeaths || 0) + (x.todayDeaths || 0);
      this.data.Global.deaths = (this.data.Global.deaths || 0) + (x.deaths || 0);
      this.data.Global.todayRecovered = (this.data.Global.todayRecovered || 0)
      + (x.todayRecovered || 0);
      this.data.Global.recovered = (this.data.Global.recovered || 0) + (x.recovered || 0);
      this.data.Global.population = (this.data.Global.population || 0) + (x.population || 0);
    });
    this.fullscreenContainer = new FullscreenContainer(this.menu);
    this.dashboardItems = [
      new GlobalCasesItem(this.globalCases, this.fullscreenContainer, this.state, this.data,
        this.handleList()),
      new CasesByRegionItem(this.casesByRegionContainer, this.fullscreenContainer, this.state,
        this.data, this.handleList()),
      new GlobalDeathsItem(this.globalDeathsContainer, this.fullscreenContainer, this.state,
        this.data, this.globalDeaths, this.handleList()),
      new GlobalRecoveredItem(this.globalRecoveredContainer, this.fullscreenContainer, this.state,
        this.data, this.globalRecovered, this.handleList()),
      new GlobalMapItem(this.mapContainer, this.fullscreenContainer, this.state,
        this.data, this.handleMap()),
      new GlobalChartItem(this.chartContainer, this.fullscreenContainer, this.state,
        this.data, null),
    ];
    this.dashboardItems.forEach((el) => new FullscreenButton(el, this.fullscreenContainer));
    this.dashboardItems.forEach((x) => x.updateItemInfo());
  }

  addEventsHandlers() {
    this.handleSearch();
    this.handleState();
  }

  handleSearch() {
    this.searchElement.results.addEventListener('mousedown', (e) => {
      const eventContainer = e.target.closest('.search__link');
      if (eventContainer) {
        this.menu.setCountry(eventContainer.querySelector('.search__country').innerText);
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
      this.menu.overlay.classList.add('hide');
      const state = this.getStateFromMenu();
      this.menu.menuEl.classList.remove('menu_active');
      this.fullscreenContainer.update();
      this.dashboardItems.forEach((x) => x.updateItemInfo(null, state));
      this.state = state;
    });
  }

  getStateFromMenu() {
    return this.menu.getState();
  }

  handleList() {
    const { menu } = this;
    return (htmlElement) => {
      htmlElement.addEventListener('click', (e) => {
        const listLink = e.target.closest('.list__link');
        if (listLink.lastChild.innerText) {
          menu.setCountry(listLink.lastChild.innerText);
        }
        menu.applyButton.dispatchEvent(new Event('mousedown'));
      });
    };
  }

  handleMap() {
    const { menu } = this;
    return (htmlElement) => {
      htmlElement.addEventListener('markerClick', (e) => {
        menu.setCountry(e.detail.country);
        menu.applyButton.dispatchEvent(new Event('mousedown'));
      });
    };
  }
}
