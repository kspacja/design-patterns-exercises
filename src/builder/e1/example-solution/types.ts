import { DocumentLineTokens } from '../types';

export interface Builder<T> {
  buildElement: (lineTokens: DocumentLineTokens) => void;
  get: () => T;
}
