import createHtmlElement from '../../utils/create';

export default class GridItem {
  constructor(classes, number, text) {
    this.gridItem = createHtmlElement('li', 'list__link',
      [
        createHtmlElement('span', classes, number, null),
        createHtmlElement('span', '', text, null),
      ], null);
    this.country = text;
  }
}
