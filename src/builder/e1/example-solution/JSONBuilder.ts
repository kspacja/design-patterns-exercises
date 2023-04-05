import { TokenType } from '../types';
import { Builder } from './types';

export interface JSONDoc {
  type?: TokenType;
  value?: string;
  children: JSONDoc[];
  parent?: JSONDoc;
}

export default class JSONBuilder implements Builder<JSONDoc> {
  result: JSONDoc = { children: [] };
  currentParent: JSONDoc = this.result;

  private createElement(
    type: TokenType,
    value: string,
    parent: JSONDoc,
  ): JSONDoc {
    return {
      type,
      value,
      parent,
      children: [],
    };
  }

  reset() {
    this.result = { children: [] };
    this.currentParent = this.result;
  }

  appendElement(type: TokenType, value: string) {
    const element = this.createElement(type, value, this.currentParent);
    this.currentParent.children.push(element);
  }

  moveDown() {
    this.currentParent =
      this.currentParent.children[this.currentParent.children.length - 1];
  }

  moveUp() {
    this.currentParent = this.currentParent.parent || this.result;
  }

  get() {
    return this.result;
  }
}

export {};
