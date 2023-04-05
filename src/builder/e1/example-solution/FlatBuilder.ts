import { TokenType } from '../types';
import { Builder } from './types';

export default class FlatBuilder implements Builder<string> {
  result = '';

  private createElement(type: TokenType, value: string): string {
    return `${type}[${value}]`;
  }

  reset() {
    this.result = '';
  }

  appendElement(type: TokenType, value: string) {
    const element = this.createElement(type, value);
    this.result += element;
  }

  moveDown() {
    this.result += '↘';
  }

  moveUp() {
    this.result += '↗';
  }

  get() {
    return this.result;
  }
}
