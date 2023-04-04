import { parseDocument } from '../parser';
import { textDocument } from '../input';

import { Builder } from './types';
import JSONBuilder from './JSONBuilder';
import DOMBuilder from './DOMBuilder';

function buildDocument<T>(textDocument: string, builder: Builder<T>) {
  const parsedDoc = parseDocument(textDocument);

  parsedDoc.forEach((lineTokens) => {
    builder.buildElement(lineTokens);
  });

  return builder.get();
}

console.log(buildDocument(textDocument, new JSONBuilder()));

const DOMDocument = buildDocument(textDocument, new DOMBuilder());
document.getElementById('root')?.append(DOMDocument);
