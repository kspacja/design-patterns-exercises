import { parseDocument } from '../parser';
import { textDocument } from '../input';

import { Builder } from './types';
import JSONBuilder from './JSONBuilder';
import DOMBuilder from './DOMBuilder';
import FlatBuilder from './FlatBuilder';

class Director<T> {
  constructor(private builder: Builder<T>) {}
  currentLevel = 0;

  buildDocument(textDocument: string) {
    const parsedDoc = parseDocument(textDocument);

    this.builder.reset();

    parsedDoc.forEach(([type, value, level]) => {
      if (level > this.currentLevel) {
        this.builder.moveDown();
        this.currentLevel = level;
      }

      if (level < this.currentLevel) {
        this.builder.moveUp();
        this.currentLevel = level;
      }

      this.builder.appendElement(type, value);
    });

    return this.builder.get();
  }
}

const jsonDirector = new Director(new JSONBuilder());
console.log(jsonDirector.buildDocument(textDocument));

const flatDirector = new Director(new FlatBuilder());
console.log(flatDirector.buildDocument(textDocument));

const director = new Director(new DOMBuilder());
const DOMDocument = director.buildDocument(textDocument);

document.getElementById('root')?.append(DOMDocument);
