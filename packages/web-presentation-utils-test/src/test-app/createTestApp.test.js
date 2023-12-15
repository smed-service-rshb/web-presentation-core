import React from 'react';
import createTestApp, {waitActions} from './index';

import {withActions} from '@efr/medservice-web-presentation-core';

const moduleDefinition = () => {
};

describe('createTestApp', () => {
    test('simple render', () => {
        const testApp = createTestApp(moduleDefinition);

        return testApp
            .render(<div id="test-app-div"/>)
            .then(({component}) => {
                expect(component.find('#test-app-div')).toBePresent();
            })
    });

    test('simple render with 2 moduleDefinitions', () => {
        const testApp = createTestApp(moduleDefinition, moduleDefinition);

        return testApp
            .render(<div id="test-app-div"/>)
            .then(({component}) => {
                expect(component.find('#test-app-div')).toBePresent();
            })
    });

    test('render with waitActions', () => {

        const testAction = {
            name: 'test-action',
            action: () => Promise.resolve()
        };
        const moduleDefinition = ({name, page, action}) => {
            action(testAction)
        };

        class TestComponent extends React.Component {
            state = {data: 'initial'};

            componentDidMount = () => {
                const {test} = this.props.actions;
                test().then(() => {
                    this.setState({data: 'mounted'})
                })
            };

            render = () => <div id="test-app-div">{this.state.data}</div>;
        }

        const testApp = createTestApp(moduleDefinition);

        const Component = withActions({test: testAction.name})(TestComponent);

        return testApp
            .render(<Component/>)
            .then(args => {
                expect(args.component.find('#test-app-div').text()).toEqual('mounted');
                return args
            })
            .then(waitActions(testAction))
            .then(({component}) => {
                expect(component.find('#test-app-div').text()).toEqual('mounted');
            })
    });
});

//TODO createTestApp.test.jsx