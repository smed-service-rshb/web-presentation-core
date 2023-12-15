import React from 'react';
import createHistory from 'history/createMemoryHistory'

import TestHelper from '@efr/medservice-react-test'

import {withActions} from '../actions';
import {withAuthContext} from '../auth';
import {withModals} from '../modal';
import {withPageRouter} from '../page-router';
import {compose} from '../utils';

import Application from './Application'


const history = createHistory();

const EMPTY_COMPONENT = () => <div/>;

const testModuleDefinition = define => {
    define.name('test-module');

    define.page({
        key: 'test-page',
        path: '/test',
        component: compose(
            withPageRouter,
            withAuthContext,
            withModals({
                modal: '',
            }),
            withActions({
                action: '',
            }),
        )(EMPTY_COMPONENT),
        availability: true,
    });

    define.action({
        name: 'test-action',
        action: () => (null),
    });

    define.modal({
        key: 'test-modal',
        component: EMPTY_COMPONENT,
    });

    return define;
};
const navigationTree = () => (null);

const testPromise = () => Promise.resolve('');

const mockLogin = ({name, action}) => {
    name('auth');
    action({
        name: 'auth.login',
        action: testPromise
    });
    action({
        name: 'auth.logout',
        action: testPromise
    });
    action({
        name: 'auth.session',
        action: testPromise
    });
};

describe('Application', () => {
    test('Render', () => {
        expect(() => {
            TestHelper.render(<Application modulesDefinition={[testModuleDefinition, mockLogin ]}
                               navigationTree={navigationTree} history={history}/>)
        }).not.toThrowError();
    });
});