import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import {ActionProvider} from '../actions'
import AuthProvider from './AuthProvider'

const actions = [
    {
        name: 'auth.session',
        action: () => (Promise.resolve({}))
    },
    {
        name: 'auth.login',
        action: () => (Promise.resolve({}))
    },
    {
        name: 'auth.logout',
        action: () => (Promise.resolve({}))
    }
];

const render = Component => TestHelper.render(<ActionProvider actions={actions}>{Component}</ActionProvider>);

export {render}

describe('AuthProvider', () => {
    describe('Render', () => {
        test('When test-app without onChangeContext => success', () => {
            expect(() => {
                const provider = render(<AuthProvider/>);
                expect(provider.getDOMNode()).toBeNull();
            }).not.toThrowError();
        });

        test('When test-app without onChangeContext and 1 children => success', () => {
            expect(() => {
                const provider = render(<AuthProvider>
                    <div/>
                </AuthProvider>);
                expect(provider.getDOMNode()).toBeNull();
            }).not.toThrowError();
        });
    });
});

//TODO AuthProvider.test.jsx