export default class DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data) {
    this.itemContainer = itemContainerSelector;
    this.fullScreen = fullScreenSelector;
    this.state = state;
    this.data = data;
    this.updateFullScreenBehavior();
  }

  updateItemInfo(data, state) {
    if (data) {
      this.data = data;
    }
    if (state) {
      this.state = state;
    }
  }

  updateFullScreenBehavior() {

  }

  getItemContainer() {
    return this.itemContainer;
  }
}
