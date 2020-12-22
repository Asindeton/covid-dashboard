import DashboardItem from './DashboardItem';
import DrawMap  from '../DrawMap';

export default class GlobalMapItem extends DashboardItem {
  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    new DrawMap(this.state,  this.data).getMapData();
    /* getMapData(state); */
  }
}
