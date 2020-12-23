export default class FullscreenButton {
  constructor(targetObject, fullscreenObject, handler) {
    this.handler = handler;
    this.targetObject = targetObject;
    this.fullscreenObject = fullscreenObject;
    this.fullscreenButton = this.targetObject.getItemContainer().querySelector('.fullscreen__toggle');
    this.addMouseListeners();
    this.addButtonActivity();
  }

  addMouseListeners() {
    this.targetObject.getItemContainer().addEventListener('mouseenter', () => {
      this.fullscreenButton.classList.remove('hide');
      this.targetElement = '';
    });
    this.targetObject.getItemContainer().addEventListener('mouseleave', () => {
      this.fullscreenButton.classList.add('hide');
    });
  }

  addButtonActivity() {
    this.fullscreenButton.addEventListener('click', () => {
      this.fullscreenObject.update(this.targetObject,
        this.targetObject.clickHandler);
    });
  }
}
