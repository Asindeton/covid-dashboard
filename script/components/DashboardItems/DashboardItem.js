export default class DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, clickHandler, htmlContainer) {
    this.itemContainer = itemContainerSelector;
    this.htmlContainer = this.itemContainer.closest('.container');
    console.log(this.htmlContainer);
    this.fullScreen = fullScreenSelector;
    this.state = state;
    this.data = data;
    if (clickHandler) {
      this.clickHandler = clickHandler;
      console.log(this.clickHandler);
      this.clickHandler(itemContainerSelector);
    }
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
    return this.htmlContainer;
  }
}
