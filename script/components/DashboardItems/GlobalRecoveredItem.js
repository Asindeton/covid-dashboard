import DashboardItem from './DashboardItem';
import numberFormatter from '../../utils/formatter';
import createHtmlElement from '../../utils/create';

export default class GlobalRecoveredItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, globalRecoveredSelector) {
    super(itemContainerSelector, fullScreenSelector, state, data);
    this.globalRecoveredCountElement = globalRecoveredSelector;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.globalRecoveredCountElement.innerHTML = numberFormatter(this.data.Global.TotalDeaths);
    this.itemContainer.innerHTML = '';
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
        this.itemContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases cases_recovered', numberFormatter(this.data.Countries[i].TotalRecovered), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }
}
