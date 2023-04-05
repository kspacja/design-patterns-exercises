import { TokenType } from '../types';

export interface Builder<T> {
  appendElement: (type: TokenType, value: string) => void;
  moveUp: () => void;
  moveDown: () => void;
  reset: () => void;
  get: () => T;
}
