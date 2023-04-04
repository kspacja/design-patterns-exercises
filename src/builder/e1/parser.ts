import { DocumentLineTokens } from './types';

const DEFAULT_INDENT = 2;

function lineToTokens(line: string) {
  const [typeWithIndent, dirtyValue] = line.split('(');

  const value = dirtyValue.replace(')', '').trim();
  const type = typeWithIndent.trim();
  const level = typeWithIndent.length - type.length - DEFAULT_INDENT;

  return [type, value, level] as DocumentLineTokens;
}

export function parseDocument(doc: string) {
  const lines = doc
    .split('\n')
    .filter((line) => line.trim())
    .map(lineToTokens);

  return lines;
}
