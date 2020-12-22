import DashboardItem from './DashboardItem';
import GridItem from '../GridItems/GridItem';
import { numberFormatterToString } from '../../utils/formatter';
import sorter from '../../utils/sorter';

export default class GlobalRecoveredItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state,
    data, globalRecoveredSelector, clickHandler) {
    super(itemContainerSelector, fullScreenSelector, state, data, clickHandler);
    this.globalRecoveredCountElement = globalRecoveredSelector;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    const getNumber = (x) => (this.state.time === 'lastDay' ? x.todayRecovered : x.recovered);
    this.globalRecoveredCountElement.innerHTML = numberFormatterToString(
      getNumber(this.data.Global), this.state.population, this.data.Global.population,
    );
    this.itemContainer.innerHTML = '';
    sorter(this.data, getNumber, this.state.population);
    for (let i = 0; i < this.data.length; i += 1) {
      if (getNumber(this.data[i]) > 0 && this.data[i].population > 0
      && (!this.state.region || this.data[i].country === this.state.region)) {
        this.itemContainer.append((new GridItem('cases cases_recovered', numberFormatterToString(getNumber(this.data[i]),
          this.state.population, this.data[i].population), this.data[i].country)).gridItem);
      }
    }
  }
}
