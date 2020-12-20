import DashboardItem from './DashboardItem';
import GridItem from '../GridItems/GridItem';
import numberFormatter from '../../utils/formatter';

export default class GlobalRecoveredItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, globalRecoveredSelector) {
    super(itemContainerSelector, fullScreenSelector, state, data);
    this.globalRecoveredCountElement = globalRecoveredSelector;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    const getNumber = (x) => (this.state.time === 'lastDay' ? x.NewRecovered : x.TotalRecovered);
    this.globalRecoveredCountElement.innerHTML = numberFormatter(getNumber(this.data.Global),
      this.state.population);
    this.itemContainer.innerHTML = '';
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
      if (getNumber(this.data.Countries[i]) > 0
      && (!this.state.region || this.data.Countries[i].Country === this.state.region)) {
        this.itemContainer.append((new GridItem('cases cases_recovered', numberFormatter(getNumber(this.data.Countries[i]), this.state.population),
          this.data.Countries[i].Country)).gridItem);
      }
    }
  }
}
