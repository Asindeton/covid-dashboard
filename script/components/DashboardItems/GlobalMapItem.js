import DashboardItem from './DashboardItem';
import MapBoxMap from '../MapBoxMap';
import createHtmlElement from '../../utils/create';

export default class GlobalMapItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, clickHandler) {
    super(itemContainerSelector, fullScreenSelector, state, data, clickHandler);
    this.initialEl = itemContainerSelector;
    this.isDrawable = true;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.drawElement(this.itemContainer);
  }

  getInitialElement() {
    return this.initialEl;
  }

  static removeElement() {
    if (document.getElementById('mapWrapper')) {
      document.getElementById('mapWrapper').remove();
    }
  }

  drawElement(container = this.itemContainer) {
    GlobalMapItem.removeElement();
    this.itemContainer = container;
    createHtmlElement('div', 'full-height', [
      createHtmlElement('div', 'inside-wrapper full-height', null, null, ['id', 'map']),
      createHtmlElement('div', 'map-overlay', null, null, ['id', 'legend']),
    ], container, ['id', 'mapWrapper']);

    const map = new MapBoxMap(this.state, this.data);
    map.renderMap();
  }
}
