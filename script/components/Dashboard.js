import DataService from './DataService';
import numberFormatter from '../utils/formatter';
import createHtmlElement from '../utils/create';
import SearchElement from './SearchElement';

export default class Dashboard {
  constructor() {
    this.generateDashboard();
    this.addEventsHandlers();
    this.searchElement = new SearchElement();
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
  }

  async updateDashboard() {
    const dataService = new DataService('https://api.covid19api.com/summary');
    this.data = await dataService.getData();
    this.updateGlobalCases();
    this.updateCasesByRegion();
    this.updateGlobalDeaths();
    this.updateGlobalRecovered();
  }

  updateGlobalCases() {
    this.globalCases.innerHTML = numberFormatter(this.data.Global.TotalConfirmed);
  }

  updateCasesByRegion() {
    this.casesByRegionContainer.innerHTML = '';
    this.data.Countries.sort((a, b) => {
      if (b.TotalConfirmed === a.TotalConfirmed) {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }

      if (b.TotalConfirmed > a.TotalConfirmed) {
        return 1;
      }
      if (b.TotalConfirmed < a.TotalConfirmed) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < this.data.Countries.length; i += 1) {
      if (this.data.Countries[i].TotalConfirmed > 0) {
        this.casesByRegionContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases', numberFormatter(this.data.Countries[i].TotalConfirmed), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }

  updateGlobalDeaths() {
    this.globalDeaths.innerHTML = numberFormatter(this.data.Global.TotalDeaths);
    this.globalDeathsContainer.innerHTML = '';
    this.data.Countries.sort((a, b) => {
      if (b.TotalDeaths === a.TotalDeaths) {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }

      if (b.TotalDeaths > a.TotalDeaths) {
        return 1;
      }
      if (b.TotalDeaths < a.TotalDeaths) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < this.data.Countries.length; i += 1) {
      if (this.data.Countries[i].TotalDeaths > 0) {
        this.globalDeathsContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases cases_death', numberFormatter(this.data.Countries[i].TotalDeaths), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }

  updateGlobalRecovered() {
    this.globalRecovered.innerHTML = numberFormatter(this.data.Global.TotalRecovered);
    this.globalRecoveredContainer.innerHTML = '';
    this.data.Countries.sort((a, b) => {
      if (b.TotalRecovered === a.TotalRecovered) {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }

      if (b.TotalRecovered > a.TotalRecovered) {
        return 1;
      }
      if (b.TotalRecovered < a.TotalRecovered) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < this.data.Countries.length; i += 1) {
      if (this.data.Countries[i].TotalRecovered > 0) {
        this.globalRecoveredContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases cases_recovered', numberFormatter(this.data.Countries[i].TotalRecovered), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }

  handleSearch() {
    document.querySelector('.search__results').addEventListener('mousedown', (e) => {
      const eventContainer = e.target.closest('.search__link');
      if (eventContainer) {
        this.region = eventContainer.querySelector('.search__country').innerText;
        this.searchElement.clearResults();
        this.searchElement.clearInput();
        console.log(this.region);
      }
    }, true);
  }
}
