import { FormBuilder } from './types';

export default class TextFormBuilder implements FormBuilder<HTMLUListElement> {
  private form = document.createElement('ul');
  private lastElement: HTMLElement | Text | null = null;

  private append(newElement: HTMLElement | Text) {
    const block = document.createElement('li');
    block.append(newElement);

    this.form.append(block);
    this.lastElement = newElement;

    return this;
  }

  addText(text: string) {
    const textNode = document.createTextNode(text);
    return this.append(textNode);
  }

  addList() {
    const list = document.createElement('ul');
    return this.append(list);
  }

  addListText(text: string) {
    if (!(this.lastElement instanceof HTMLUListElement)) {
      throw new Error('You can add list text to only to list');
    }

    const listItem = document.createElement('li');
    listItem.textContent = `[ ] ${text}`;

    this.lastElement.append(listItem);

    return this;
  }

  addLabel(text: string) {
    if (!this.lastElement) {
      throw new Error('You can add label only to a field');
    }

    const label = document.createElement('i');
    label.textContent = `${text}: `;

    this.lastElement.parentElement?.prepend(label);

    return this;
  }

  get() {
    return this.form;
  }
}
