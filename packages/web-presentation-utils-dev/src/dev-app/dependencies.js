import {compose} from '@efr/medservice-web-presentation-core';

const dependency = name => value => define => {
    if (!define) {
        console.log(`Не получен конфигуратор модуля для определения зависимостей [${name}] (проверь возврат аргумента в функции определения модуля).`);
        throw new Error('Ошибка конфигурирования модуля.');
    }

    define.dependency[name](value);
    return define;
};

export const WithoutExternalDependency = dependency('empty')();

const fieldResolver = name => type => data => {
    if (!data[name]) {
        console.log(`Ошибка конфигурирования зависимости от внешнего ресурса '${type}': проверь наличие атрибута '${name}' у ресурса.`);
        throw new Error('Ошибка конфигурирования модуля.');
    }
    return data[name];
};
export const nameFieldResolver = fieldResolver('name');
export const keyFieldResolver = fieldResolver('key');
export const serviceNameFieldResolver = fieldResolver('serviceName');

export const actionDependency = dependency('action');
export const modalDependency = dependency('modal');
export const pageDependency = dependency('page');

export const withDependency = (dependency, transform) => items => compose(
    ...Object.keys(items).map(key => dependency(transform(items[key]))),
);


export const WithExternalActionDependency = withDependency(actionDependency, nameFieldResolver('action'));
export const WithExternalModalDependency = withDependency(modalDependency, keyFieldResolver('modal'));
export const WithExternalPageDependency = withDependency(pageDependency, keyFieldResolver('page'));
