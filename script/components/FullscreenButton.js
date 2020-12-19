export default class FullscreenButton {
  constructor(targetContainer, fullscreenObject) {
    this.targetContainer = targetContainer;
    this.fullscreenObject = fullscreenObject;
    this.fullscreenButton = this.targetContainer.querySelector('.fullscreen__toggle');
    this.addMouseListeners();
    this.addButtonActivity();
  }

  addMouseListeners() {
    this.targetContainer.addEventListener('mouseenter', () => {
      this.fullscreenButton.classList.remove('hide');
    });
    this.targetContainer.addEventListener('mouseleave', () => {
      this.fullscreenButton.classList.add('hide');
    });
  }

  addButtonActivity() {
    this.fullscreenButton.addEventListener('click', () => {
      this.fullscreenObject.update(this.targetContainer);
    });
  }
}
