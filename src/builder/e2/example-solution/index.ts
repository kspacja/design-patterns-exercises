import TextFormBuilder from './TextFormBuilder';
import { FormBuilder } from './types';
import UIFormBuilder from './UIFormBuilder';
import StringFormBuilder from './StringFormBuilder';

function generateForm<T>(formBuilder: FormBuilder<T>) {
  return formBuilder
    .addText('Krzysztof Ciach')
    .addLabel('name')
    .addText('34')
    .addLabel('age')
    .addList()
    .addLabel('hobbies')
    .addListText('Sport')
    .addListText('Music')
    .addListText('Movies')
    .get();
}

const uiForm = generateForm(new UIFormBuilder());

const textForm = generateForm(new TextFormBuilder());

const stringForm = generateForm(new StringFormBuilder());

document.getElementById('root')?.append(uiForm);

document.getElementById('root')?.append(textForm);

console.log(stringForm);
