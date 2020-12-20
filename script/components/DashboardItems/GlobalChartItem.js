import DashboardItem from './DashboardItem';
import { getGraphData } from '../graph/script';

export default class GlobalChartItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    console.log(data, state);
    getGraphData();
  }
}
