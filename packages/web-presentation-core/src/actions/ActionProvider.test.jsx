import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import ActionProvider, {ActionsContext} from './ActionProvider'

describe('ActionProvider', () => {
    let rootContext;
    const ContextChecker = () => <ActionsContext.Consumer>
        {context => {
            rootContext = context;
            return null;
        }}
    </ActionsContext.Consumer>;

    describe('Render', () => {
        test('When test-app without actions => success', () => {
            expect(() => {
                const provider = TestHelper.render(<ActionProvider/>);
                expect(provider.getDOMNode()).toBeNull();
            }).not.toThrowError();
        });

        test('When test-app without actions with 1 children=> success', () => {
            expect(() => {
                const provider = TestHelper.render(<ActionProvider>
                    <div/>
                </ActionProvider>);
                expect(provider).toBeDefined();
            }).not.toThrowError();
        });

        test('When test-app without actions with few children=> success', () => {
            expect(() => {
                const provider = TestHelper.render(<ActionProvider>
                    <div/>
                    <div/>
                </ActionProvider>);
                expect(provider).toBeDefined();
            }).not.toThrowError();
        });

        test('When test-app with actions => success', () => {
            const actions = [
                {
                    name: 'some-action',
                    action: () => ({})
                },
                {
                    name: 'some-another-action2',
                    action: () => ({})
                }
            ];

            expect(() => {
                TestHelper.render(<ActionProvider actions={actions}/>);
            }).not.toThrowError();
        });
    });

    describe('Actions', () => {
        test('When actions key duplicated => test-app throw Error', () => {
            const actions = [
                {
                    name: 'some-action',
                    action: () => ({})
                },
                {
                    name: 'some-action',
                    action: () => ({})
                }
            ];

            expect(() => {
                TestHelper.render(<ActionProvider actions={actions}/>)
            }).toThrowError();
        });

        test('When actions call => all params passes', () => {
            const action =
                {
                    name: 'some-action',
                    action: jest.fn()
                };
            TestHelper.render(<ActionProvider actions={[action]}><ContextChecker/></ActionProvider>);

            const actionsLocator = rootContext.actionsLocator;
            const receivedAction = actionsLocator.get(action.name);

            expect(actionsLocator).toBeDefined();
            expect(receivedAction).toBeDefined();

            const someParam1 = 'asdasdasd';
            const someParam2 = 123123;

            receivedAction(someParam1, someParam2);

            expect(action.action).toBeCalledWith(someParam1, someParam2);
        });
    });

    describe('Context', () => {
        test('Test context for empty props ', () => {
            TestHelper.render(<ActionProvider><ContextChecker/></ActionProvider>);

            expect(rootContext.actionsLocator).toBeDefined();
        });

        test('When actionsLocator get registered actions => action returned', () => {
            const actions = [
                {
                    name: 'some-action',
                    action: () => ({})
                },
                {
                    name: 'some-another-action2',
                    action: () => ({})
                }
            ];
            TestHelper.render(<ActionProvider actions={actions}><ContextChecker/></ActionProvider>);

            const actionsLocator = rootContext.actionsLocator;

            expect(actionsLocator).toBeDefined();
            actions.forEach(action => {
                expect(actionsLocator.get(action.name)).toBe(action.action)
            });
        });

        test('When actionsLocator get unregistered actions => throw Error', () => {
            const actions = [
                {
                    name: 'some-action',
                    action: () => ({})
                },
                {
                    name: 'some-another-action2',
                    action: () => ({})
                }
            ];

            TestHelper.render(<ActionProvider actions={actions}><ContextChecker/></ActionProvider>);

            const actionsLocator = rootContext.actionsLocator;

            expect(actionsLocator).toBeDefined();
            actions.forEach(action => {
                const wrongName = action.name + "-wrong-suffix";
                expect(() => {
                    actionsLocator.get(wrongName)
                }).toThrowError();
            });
        });
    })
});