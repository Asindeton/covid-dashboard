import DashboardItem from './DashboardItem';
import numberFormatter from '../../utils/formatter';
import createHtmlElement from '../../utils/create';

export default class GlobalDeathsItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, globalDeathsSelector) {
    super(itemContainerSelector, fullScreenSelector, state, data);
    this.globalDeathsCountElement = globalDeathsSelector;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.globalDeathsCountElement.innerHTML = numberFormatter(this.data.Global.TotalDeaths);
    this.itemContainer.innerHTML = '';
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
        this.itemContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases cases_death', numberFormatter(this.data.Countries[i].TotalDeaths), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }
}
