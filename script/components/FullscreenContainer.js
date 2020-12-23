export default class FullscreenContainer {
  constructor(menu) {
    this.element = document.querySelector('.fullscreen');
    this.closeButton = this.element.querySelector('.button__close');
    this.targetObject = null;
    this.menu = menu;
    this.addEventsHandlers();
  }

  addEventsHandlers() {
    this.closeButton.addEventListener('click', () => {
      this.element.classList.add('hide');
      if (this.targetObject.isDrawable) {
        this.targetObject.itemContainer = this.targetObject.getInitialElement();
        this.targetObject.updateItemInfo();
      }
      this.targetObject = '';
    });
  }

  setDrawable() {
    if (this.targetObject.itemContainer !== this.element) {
      this.targetObject.itemContainer = this.element;
      this.targetObject.drawElement();
      if (this.clickHandler) {
        this.clickHandler(this.element);
      }
    }
  }

  update(targetObject = this.targetObject, clickHandler = this.clickHandler) {
    this.targetObject = targetObject;
    this.clickHandler = clickHandler;
    this.remove();
    if (this.targetObject) {
      if (this.targetObject.isDrawable) {
        this.setDrawable();
      } else {
        this.insertedElement = this.targetObject.getItemContainer().cloneNode(true);
        this.insertedElement.querySelector('.fullscreen__toggle').remove();
        this.clickHandler(this.insertedElement);
        this.element.insertBefore(this.insertedElement, this.element.firstChild);
      }
      this.element.classList.remove('hide');
    }
  }

  remove() {
    if (this.element.querySelector('.inside-wrapper')) {
      this.element.querySelector('.inside-wrapper').remove();
    }
  }
}
