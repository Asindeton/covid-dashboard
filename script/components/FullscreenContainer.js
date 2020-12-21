export default class FullscreenContainer {
  constructor(menu) {
    this.element = document.querySelector('.fullscreen');
    this.closeButton = this.element.querySelector('.button__close');
    this.targetElement = null;
    this.menu = menu;
    this.addEventsHandlers();
  }

  addEventsHandlers() {
    this.closeButton.addEventListener('click', () => {
      this.element.classList.add('hide');
      this.targetElement = '';
    });
  }

  update(targetContainer = this.targetElement, clickHandler = this.clickHandler) {
    this.targetElement = targetContainer;
    this.clickHandler = clickHandler;
    this.remove();
    if (this.targetElement) {
      this.insertedElement = this.targetElement.cloneNode(true);
      this.insertedElement.querySelector('.fullscreen__toggle').remove();
      this.element.classList.remove('hide');
      this.clickHandler(this.insertedElement);
      this.element.insertBefore(this.insertedElement, this.element.firstChild);
    }
  }

  remove() {
    if (this.insertedElement) this.insertedElement.remove();
  }
}
