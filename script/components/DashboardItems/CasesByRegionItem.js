import DashboardItem from './DashboardItem';
import numberFormatter from '../../utils/formatter';
import createHtmlElement from '../../utils/create';

export default class CasesByRegionItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.itemContainer.innerHTML = '';
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
        this.itemContainer.append(createHtmlElement('li', 'list__link',
          [
            createHtmlElement('span', 'cases', numberFormatter(this.data.Countries[i].TotalConfirmed), null),
            createHtmlElement('span', '', this.data.Countries[i].Country, null),
          ], null));
      }
    }
  }
}
