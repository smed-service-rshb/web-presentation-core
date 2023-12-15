import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import testPropTypes from '../prop-types-for-test'

import ActionProvider from './ActionProvider'
import withActions from './withActions'

const ComponentForWrap = () => (<div/>);
const WrapAuthProvider = (Component, ...actions) => <ActionProvider actions={actions}><Component/></ActionProvider>;

ComponentForWrap.propTypes = testPropTypes;

describe('withActions', () => {
    describe('Render', () => {
        test('When test-app without actionsToProps => success', () => {
            const WithActionsComponent = withActions()(ComponentForWrap);

            expect(() => {
                const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent));
                expect(actionProvider.find(ComponentForWrap)).toBePresent();
            }).not.toThrowError();
        });

        test('When test-app with actionsToProps => success', () => {
            const WithActionsComponent = withActions({})(ComponentForWrap);

            expect(() => {
                const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent));
                expect(actionProvider.find(ComponentForWrap)).toBePresent();
            }).not.toThrowError();
        });
    });

    describe('Wrap', () => {
        test('Wrapped component propTypes contains original propTypes', () => {
            const WithActionsComponent = withActions()(ComponentForWrap);
            const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent));

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.type().propTypes).toEqual(expect.objectContaining(ComponentForWrap.propTypes))
        });

        test('When component wrapped withActions without actionsToProps => empty actions object passed to props', () => {
            const WithActionsComponent = withActions()(ComponentForWrap);
            const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent));

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.props().actions).toEqual({})
        });

        test('When component wrapped withActions with actionsToProps => actions object passed to props with expected actions', () => {
            const action =
                {
                    name: 'some-action',
                    action: jest.fn()
                };

            const actionsToProps = {
                someAction: action.name
            };
            const WithActionsComponent = withActions(actionsToProps)(ComponentForWrap);
            const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent, action));

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.props().actions).toBeDefined();
            expect(wrappedComponents.props().actions.someAction).toBeDefined()
        });

        test('When component multiple wrapped withActions with actionsToProps => actions object passed to props with expected actions', () => {
            const action1 =
                {
                    name: 'some-action',
                    action: jest.fn()
                };

            const actionsToProps1 = {
                someAction1: action1.name
            };
            const action2 =
                {
                    name: 'some-action',
                    action: jest.fn()
                };

            const actionsToProps2 = {
                someAction2: action2.name
            };
            const WithActionsComponent = withActions(actionsToProps1)(withActions(actionsToProps2)(ComponentForWrap));
            const actionProvider = TestHelper.render(WrapAuthProvider(WithActionsComponent, action1));

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.props().actions).toBeDefined();
            expect(wrappedComponents.props().actions.someAction1).toBeDefined();
            expect(wrappedComponents.props().actions.someAction2).toBeDefined();
        });

        test('Test action call', () => {

            const action =
                {
                    name: 'some-action',
                    action: jest.fn()
                };
            const actionsToProps = {
                someAction: action.name,
            };

            const WithActionsComponent = withActions(actionsToProps)(ComponentForWrap);

            const actionProvider = TestHelper.render(
                <ActionProvider actions={[action]}>
                    <WithActionsComponent/>
                </ActionProvider>
            );

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.props().actions).toBeDefined();

            const receivedSomeAction = wrappedComponents.props().actions.someAction;

            expect(receivedSomeAction).toBeDefined();

            const someParam1 = 'asdasdasd';
            const someParam2 = 123123;

            receivedSomeAction(someParam1, someParam2);

            const resObj = {
                RestClient: expect.any(Object)
            };

            expect(action.action).toBeCalledWith(expect.objectContaining(resObj), someParam1, someParam2);
        });

        test('Test props passed to wrapped component', () => {
            const props = {
                optionalString: "sdfsdf",
                optionalNumber: 123123
            };

            const WithActionsComponent = withActions()(ComponentForWrap);
            const actionProvider = TestHelper.render(
                <ActionProvider><WithActionsComponent {...props}/></ActionProvider>);

            const wrappedComponents = actionProvider.find(ComponentForWrap);
            expect(wrappedComponents).toBePresent();

            expect(wrappedComponents.props()).toEqual({
                ...props,
                actionsContext: expect.any(Object),
                actions: {},
                getAction: expect.any(Function),
                restClientSettings: expect.any(Object),
                buildBackendUrl: expect.any(Function),
            })
        });
    });
});
