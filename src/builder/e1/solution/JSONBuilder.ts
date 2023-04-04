import { DocumentLineTokens, TokenType } from '../types';
import { Builder } from './types';

export interface JSONDoc {
  type?: TokenType;
  value?: string;
  children: JSONDoc[];
  parent?: JSONDoc;
}

export default class JSONBuilder implements Builder<JSONDoc> {
  result: JSONDoc = { children: [] };
  currentLevel = 0;
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

  buildElement(lineTokens: DocumentLineTokens) {
    const [type, value, level] = lineTokens;

    if (level > this.currentLevel) {
      this.currentParent =
        this.currentParent.children[this.currentParent.children.length - 1];
      this.currentLevel = level;
    }

    if (level < this.currentLevel) {
      this.currentParent = this.currentParent.parent || this.result;
      this.currentLevel = level;
    }

    const element = this.createElement(type, value, this.currentParent);

    this.currentParent.children.push(element);
  }

  get() {
    return this.result;
  }
}

export {};
