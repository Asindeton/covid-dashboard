import DashboardItem from './DashboardItem';
import numberFormatter from '../../utils/formatter';

export default class GlobalCasesItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.itemContainer.innerHTML = numberFormatter(this.data.Global.TotalConfirmed,
      this.state.population);
  }
}
