import DashboardItem from './DashboardItem';
import GridItem from '../GridItems/GridItem';
import { numberFormatterToString } from '../../utils/formatter';
import sorter from '../../utils/sorter';

export default class CasesByRegionItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.itemContainer.innerHTML = '';
    const getNumber = (x) => (this.state.time === 'lastDay' ? x.todayCases : x.cases);
    sorter(this.data, getNumber, this.state.population);
    for (let i = 0; i < this.data.length; i += 1) {
      if (getNumber(this.data[i]) > 0 && this.data[i].population > 0
      && (!this.state.region || this.data[i].country === this.state.region)) {
        this.itemContainer.append((new GridItem('cases', numberFormatterToString(getNumber(this.data[i]), this.state.population, this.data[i].population),
          this.data[i].country)).gridItem);
      }
    }
  }
}
