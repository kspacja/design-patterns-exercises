export type FieldType = 'select' | 'text' | 'number';

export interface FormBuilder<T> {
  addText(text?: string): FormBuilder<T>;
  addList(): FormBuilder<T>;
  addListText(text: string): FormBuilder<T>;
  addLabel(text: string): FormBuilder<T>;
  get(): T;
}
