import DashboardItem from './DashboardItem';
import { numberFormatterToString } from '../../utils/formatter';

export default class GlobalCasesItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    const getNumber = (x) => (this.state.time === 'lastDay' ? x.todayCases : x.cases);
    this.itemContainer.innerHTML = numberFormatterToString(getNumber(this.data.Global),
      this.state.population, this.data.Global.population);
  }
}
