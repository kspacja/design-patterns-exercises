import { DocumentLineTokens, TokenType } from '../types';
import { Builder } from './types';

const globalStyle = `
  .custom-dom * {
    margin: 5px;
    padding: 5px;
    border: solid 1px #ddd;
  }
`;

export default class DOMBuilder implements Builder<HTMLElement> {
  result: HTMLElement = document.createElement('div');
  currentLevel = 0;
  currentParent: HTMLElement = this.result;

  constructor() {
    const styleNode = document.createElement('style');
    styleNode.appendChild(document.createTextNode(globalStyle));

    this.result.append(styleNode);
    this.result.className = 'custom-dom';
  }

  private createElement(type: TokenType, value: string): HTMLElement {
    let div: HTMLElement;

    switch (type) {
      case 'img':
        // eslint-disable-next-line no-case-declarations
        const img = document.createElement('img');
        img.src = value;
        div = img;
        break;
      case 'text':
        div = document.createElement('div');
        div.textContent = value;
        break;
      case 'block':
        div = document.createElement('div');
        div.style['display'] = 'flex';
        div.style['flexDirection'] = value;
    }

    return div;
  }

  buildElement(lineTokens: DocumentLineTokens) {
    const [type, value, level] = lineTokens;

    if (level > this.currentLevel) {
      this.currentParent = this.currentParent.children[
        this.currentParent.children.length - 1
      ] as HTMLElement;
      this.currentLevel = level;
    }

    if (level < this.currentLevel) {
      this.currentParent = this.currentParent.parentElement || this.result;
      this.currentLevel = level;
    }

    const element = this.createElement(type, value);

    this.currentParent.append(element);
  }

  get() {
    return this.result;
  }
}

export {};
