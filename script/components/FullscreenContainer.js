export default class FullscreenContainer {
  constructor() {
    this.element = document.querySelector('.fullscreen');
    this.closeButton = this.element.querySelector('.button__close');
    this.targetElement = null;
    this.addEventsHandlers();
  }

  addEventsHandlers() {
    this.closeButton.addEventListener('click', () => {
      this.element.classList.add('hide');
    });
  }

  update(targetContainer = this.targetElement) {
    this.targetElement = targetContainer;
    this.remove();
    if (this.targetElement) {
      this.insertedElement = this.targetElement.cloneNode(true);
      this.insertedElement.querySelector('.fullscreen__toggle').remove();
      this.element.classList.remove('hide');
      this.element.insertBefore(this.insertedElement, this.element.firstChild);
    }
  }

  remove() {
    if (this.insertedElement) this.insertedElement.remove();
  }
}
