import { FormBuilder } from './types';

export default class StringFormBuilder implements FormBuilder<string> {
  private form = '';

  private append(text: string, level: number) {
    const indent = [...new Array(level)].map(() => ' ').join('');

    this.form += `${indent}${text}\n`;
    return this;
  }

  addText(text: string) {
    return this.append(text, 0);
  }

  addList() {
    return this.append('', 0);
  }

  addListText(text: string) {
    return this.append(`[ ] ${text}`, 2);
  }

  addLabel(text: string) {
    const indexOfLastLineEnd = this.form.lastIndexOf(
      '\n',
      this.form.length - 2,
    );

    const label = `${indexOfLastLineEnd > 0 ? '\n' : ''}${text}: `;

    this.form =
      this.form.substring(0, indexOfLastLineEnd) +
      label +
      this.form.substring(indexOfLastLineEnd + 1);

    return this;
  }

  get() {
    return this.form;
  }
}
