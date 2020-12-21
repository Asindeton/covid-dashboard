export default class DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, clickHandler) {
    this.itemContainer = itemContainerSelector;
    this.htmlContainer = this.itemContainer.closest('.container');
    this.fullScreen = fullScreenSelector;
    this.state = state;
    this.data = data;
    this.clickHandler = clickHandler;
    if (clickHandler) {
      this.clickHandler(itemContainerSelector);
    }
  }

  updateItemInfo(data, state) {
    if (data) {
      this.data = data;
    }
    if (state) {
      this.state = state;
    }
  }

  getItemContainer() {
    return this.htmlContainer;
  }
}
