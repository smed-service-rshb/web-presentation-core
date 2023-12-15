import React from 'react';

import {createTestApp} from '@efr/medservice-web-presentation-utils-test'
import {Button} from '@efr/medservice-web-presentation-ui';

import {EntitiesListPage} from '../entities-list';
import EntityEditComponent from './EntityEdit';
import moduleDefinition from '../../../index'

const testApp = createTestApp(moduleDefinition);

describe.skip('EntityEditComponent', () => {
    test('Render', () => {
        const id = 123;
        return testApp.render(<EntityEditComponent id={id}/>).then(({component}) => {
            expect(component.find("#entity-id").text()).toEqual(`${id}`);
        })
    });

    test('Click to list link', () => (
        testApp.render(<EntityEditComponent id={123}/>).then(({component, pageRouter}) => {
            component.find(Button).filterWhere(node => node.props().name === "К списку").simulate('click');
            expect(pageRouter.open).toBeCalledWith(EntitiesListPage.key);
        })
    ));

    test('Click to index link', () => (
        testApp.render(<EntityEditComponent id={123}/>).then(({component, pageRouter}) => {
            component.find(Button).filterWhere(node => node.props().name === "На дефолтную страницу").simulate('click');
            expect(pageRouter.openIndex).toBeCalled();
        })
    ));
});