import DashboardItem from './DashboardItem';
import GridItem from '../GridItems/GridItem';
import numberFormatter from '../../utils/formatter';

export default class CasesByRegionItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.itemContainer.innerHTML = '';
    const getNumber = (x) => (this.state.time === 'lastDay' ? x.NewConfirmed : x.TotalConfirmed);
    this.data.Countries.sort((a, b) => {
      if (getNumber(b) === getNumber(a)) {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }

      if (getNumber(b) > getNumber(a)) {
        return 1;
      }
      if (getNumber(b) < getNumber(a)) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < this.data.Countries.length; i += 1) {
      if (getNumber(this.data.Countries[i]) > 0) {
        this.itemContainer.append((new GridItem('cases', numberFormatter(getNumber(this.data.Countries[i]), this.state.population),
          this.data.Countries[i].Country)).gridItem);
      }
    }
  }
}
