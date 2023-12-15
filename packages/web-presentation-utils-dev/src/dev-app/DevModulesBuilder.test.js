import React from 'react';

import {compose} from '@efr/medservice-web-presentation-core';

import DevModulesBuilder, {IGNORE_DEPENDENCY_ARGUMENT} from './DevModulesBuilder';
import {
    WithoutExternalDependency,
    WithExternalActionDependency,
    WithExternalModalDependency,
    WithExternalPageDependency
} from './dependencies';


const EMPTY_CALLBACK = () => {
};

const checkResources = (expectedResources, actualResources, keyField) => {
    expect(actualResources.length).toBe(expectedResources.length);
    const checkedResources = {};
    expectedResources.forEach(expectedResource => {
        expect(expectedResource[keyField]).toBeDefined();
        expect(checkedResources[expectedResource[keyField]]).toBeUndefined();
        checkedResources[expectedResource[keyField]] = actualResources.find(resource => expectedResource[keyField] === resource[keyField]);
        expect(checkedResources[expectedResource[keyField]]).toBeDefined();
    });
};

const checkAvailable = (consumer, expectedResources, actualResources, resourceResolver, keyField) => {
    const available = resourceKey => {
        expect(() => {
            resourceResolver(resourceKey, consumer);
        }).not.toThrowError();
        return true;
    };
    const unavailable = resourceKey => {
        global.console = {error: jest.fn()};
        resourceResolver(resourceKey, consumer);
        expect(global.console.error).toBeCalled();
        return true;
    };

    actualResources.forEach(resource => {
        const resourceKey = resource[keyField];
        (expectedResources.includes(resourceKey) ? available : unavailable)(resourceKey);
    });
};

const definition = (testingDefinition, dependency = arg => arg) => {
    let providerDefinition = () => {
    };

    const providerPages = [];
    const providerActions = [];
    const providerModals = [];

    let testModuleName;

    const testingDefinitionWithDependency = compose(
        dependency,
        testingDefinition,
    );

    testingDefinitionWithDependency({
        name: name => {
            testModuleName = name;
        },
        page: EMPTY_CALLBACK,
        action: EMPTY_CALLBACK,
        modal: EMPTY_CALLBACK,
        ...IGNORE_DEPENDENCY_ARGUMENT,
    });

    const definitionResult = {
        withProvider: provider => {
            providerDefinition = provider;

            provider({
                name: EMPTY_CALLBACK,
                page: page => providerPages.push(page),
                action: action => providerActions.push(action),
                modal: modal => providerModals.push(modal),
                ...IGNORE_DEPENDENCY_ARGUMENT,
            });

            return definitionResult;
        },
        build: () => {
            let resolve;
            try {
                const data = DevModulesBuilder([testingDefinitionWithDependency, providerDefinition]);
                resolve = () => data;
            } catch (e) {
                resolve = () => {
                    throw e;
                }
            }

            const resultChecker = {
                resources: ({expectedPages = [], expectedActions = [], expectedModals = [], page = [], action = [], modal = []}) => {
                    const buildResult = resolve();
                    checkResources([...providerPages, ...expectedPages, ...page], buildResult.pages, 'key');
                    checkResources([...providerActions, ...expectedActions, ...action], buildResult.actions, 'name');
                    checkResources([...providerModals, ...expectedModals, ...modal], buildResult.modals, 'key');
                },
                available: ({actions: expectedActions = [], modals: expectedModals = [], pages: expectedPages = []}) => {
                    const buildResult = resolve();
                    checkAvailable(testModuleName, expectedActions, buildResult.actions, buildResult.actionResolver, 'name');
                    checkAvailable(testModuleName, expectedModals, buildResult.modals, buildResult.modalResolver, 'key');
                    checkAvailable(testModuleName, expectedPages, buildResult.pages, buildResult.pageResolver, 'key');
                }
            };

            return {
                expect: {
                    success: () => expect(resolve).not.toThrowError() && resultChecker,
                    error: () => expect(resolve).toThrowError(),
                    ...resultChecker,
                },
            };
        },
    };

    return definitionResult;
};

const resourceProvider = provider => {
    const moduleName = `${provider.name}-provider-module`;
    const sharedResourceName = `shared-${provider.name}`;
    const privateResourceName = `private-${provider.name}`;
    const sharedResource = provider(sharedResourceName);
    const result = define => {
        define.name(moduleName);
        sharedResource.register(define);
        provider(privateResourceName).register(define);
        return define;
    };
    result.sharedResourceName = sharedResourceName;
    result.sharedResource = sharedResource.item;
    return result;
};

const resource = (type, factory) => name => {
    const item = factory(name);
    return {
        item,
        register: define => define[type](item),
    }
};

const action = resource('action', name => ({
    name,
    action: EMPTY_CALLBACK,
}));
const actionProvider = resourceProvider(action);

const modal = resource('modal', key => ({
    key,
    component: <div/>,
}));
const modalProvider = resourceProvider(modal);

const page = resource('page', key => ({
    key,
    path: `/${key}`,
    component: <div/>,
}));
const pageProvider = resourceProvider(page);

const EMPTY_MODULE = define => {
    define.name('test-module');
    return define;
};

const testDefinition = type => resource => {
    const buildResult = definition(define => {
        define.name('test-module');
        define[type](resource);
        return define;
    }, WithoutExternalDependency).build();
    return {
        success: () => {
            test(`${type} definition with ${Object.keys(resource)} => ok`, () => {
                buildResult.expect.resources({[type]: [resource]});
            });
        },
        error: () => {
            test(`${type} definition with ${Object.keys(resource)} => error`, () => {
                buildResult.expect.error();
            });
        },
    }
};

const testResource = (name, dependency, provider) => {
    const providedResourceDependency = dependency({shared: provider.sharedResource});
    const notProvidedResourceDependency = dependency({shared: provider.sharedResource});
    test(`with ${name} dependency => ok`, () => {
        definition(EMPTY_MODULE, providedResourceDependency)
            .withProvider(provider).build().expect.success();
    });
    test(`with not provided ${name} dependency => error`, () => {
        definition(EMPTY_MODULE, dependency(notProvidedResourceDependency))
            .build().expect.error();
    });
    test(`check ${name} availability`, () => {
        definition(EMPTY_MODULE, providedResourceDependency)
            .withProvider(provider).build().expect.available({[name]: [provider.sharedResourceName]});
    });
};

describe('static check', () => {
    describe('structure', () => {
        describe('name definition', () => {
            test('name definition first => ok', () => {
                definition(define => {
                    define.name('test-module');
                    return define;
                }, WithoutExternalDependency).build().expect.success();
            });
            test('name definition after page => error', () => {
                definition(define => {
                    define.page({
                        key: 'test-page',
                        path: '/test',
                        component: <div/>,
                    });
                    return define;
                }).build().expect.error();
            });
            test('name definition after action => error', () => {
                definition(define => {
                    define.action({
                        name: 'test-action',
                        action: EMPTY_CALLBACK,
                    });
                    return define;
                }).build().expect.error();
            });
            test('name definition after modal => error', () => {
                definition(define => {
                    define.modal({
                        key: 'test-modal',
                        component: <div/>,
                    });
                    return define;
                }).build().expect.error();
            });
            test('name definition after dependency => error', () => {
                definition(define => define, WithoutExternalDependency).build().expect.error();
            });
        });
        describe('page definition', () => {
            const key = 'test-page';
            const path = '/test';
            const component = <div/>;
            const availability = true;
            const testPageDefinition = testDefinition('page');

            testPageDefinition({key, path, component}).success();
            testPageDefinition({key, path, component, availability}).success();
            testPageDefinition({key, path}).error();
            testPageDefinition({key, component}).error();
            testPageDefinition({path, component}).error();
        });
        describe('action definition', () => {
            const name = 'test-action';
            const action = EMPTY_CALLBACK;
            const testActionDefinition = testDefinition('action');

            testActionDefinition({name, action}).success();
            testActionDefinition({action}).error();
            testActionDefinition({name}).error();
            testActionDefinition({}).error();
        });
        describe('modal definition', () => {
            const key = 'test-modal';
            const component = <div/>;
            const testModalDefinition = testDefinition('modal');

            testModalDefinition({key, component}).success();

            testModalDefinition({}).error();
            testModalDefinition({key}).error();
            testModalDefinition({component}).error();
        });
    });
    describe('dependency', () => {
        test('without dev module => error', () => {
            definition(EMPTY_MODULE)
                .build().expect.error();
        });
        test('with empty dependency => ok', () => {
            definition(EMPTY_MODULE, WithoutExternalDependency)
                .build().expect.success();
        });
        testResource('actions', WithExternalActionDependency, actionProvider);
        testResource('modals', WithExternalModalDependency, modalProvider);
        testResource('pages', WithExternalPageDependency, pageProvider);
    });
});
