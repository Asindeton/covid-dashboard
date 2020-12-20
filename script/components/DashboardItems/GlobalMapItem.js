import DashboardItem from './DashboardItem';
import DrawMap  from '../map/script';

export default class GlobalMapItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    new DrawMap(this.state).getMapData()
    /* getMapData(state); */
  }
}
