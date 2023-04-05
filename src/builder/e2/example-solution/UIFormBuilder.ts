import { FormBuilder } from './types';

function createInput(type: HTMLInputElement['type']) {
  const input = document.createElement('input');
  input.type = type;

  return input;
}

function createSelect() {
  const select = document.createElement('select');
  return select;
}

function createLabel(labelText: string, id: string) {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;

  return label;
}

function createOption(value: string, label: string) {
  const opt = document.createElement('option');
  opt.value = value;
  opt.textContent = label;

  return opt;
}

export default class UIFormBuilder implements FormBuilder<HTMLFormElement> {
  private form = document.createElement('form');
  private lastElement: HTMLInputElement | HTMLSelectElement | null = null;

  private append(newElement: HTMLInputElement | HTMLSelectElement) {
    const block = document.createElement('p');
    block.append(newElement);

    this.form.append(block);
    this.lastElement = newElement;

    return this;
  }

  addText(text: string) {
    const input = createInput('text');
    input.value = text;
    return this.append(input);
  }

  addList() {
    const select = createSelect();
    return this.append(select);
  }

  addListText(value?: string) {
    if (!(this.lastElement instanceof HTMLSelectElement)) {
      throw new Error('You can add list text to only to list');
    }

    if (value) {
      this.lastElement.append(createOption(value, value));
    }

    return this;
  }

  addLabel(text: string) {
    if (!this.lastElement) {
      throw new Error('You can add label only to a field');
    }

    this.lastElement.name = text;
    this.lastElement.id = `form-id-${text}`;

    this.lastElement.parentElement?.prepend(
      createLabel(text, this.lastElement.id),
    );

    return this;
  }

  get() {
    return this.form;
  }
}
