import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import testPropTypes from '../prop-types-for-test'

import withAuthContext from './withAuthContext'


const ComponentForWrap = () => (<div/>);
ComponentForWrap.propTypes = testPropTypes;

describe('withAuthContext', () => {
    test('Render', () => {
        const WithAuthContextComponent = withAuthContext(ComponentForWrap);

        const wrappedComponent = TestHelper.render(<WithAuthContextComponent/>);
        expect(wrappedComponent.find(ComponentForWrap).exists()).toEqual(true);
    });
});

//TODO withAuthContext.test.jsx