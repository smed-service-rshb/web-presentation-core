import React from 'react';

import {createTestApp} from '@efr/medservice-web-presentation-utils-test'

import EntityViewComponent from './EntityView';

import moduleDefinition, {moduleName, Permissions} from '../../../index'

const ENTITY_VIEW_EXPECTED_RIGHTS = [
    Permissions.LIST,
];

const testApp = createTestApp(moduleDefinition).withRights(ENTITY_VIEW_EXPECTED_RIGHTS);


describe('EntityViewComponent', () => {
    test('Render', () => {
        const id = 123;
        const userName = "VASYA";

        return testApp
            .withAuthContext(({user}) => {
                user.name(userName);
            })
            .render(<EntityViewComponent id={id}/>)
            .then(({component}) => {
                expect(component.find("#entity-id").text()).toEqual(`${id}`);
                expect(component.find("#user-name-id").text()).toEqual(userName);
                expect(component.find("#list-link")).not.toBePresent();
            })
    });

    test('Click to list link', () => (
        testApp
            .withAuthContext(({rights}) => {
                rights(ENTITY_VIEW_EXPECTED_RIGHTS);
            })
            .render(<EntityViewComponent id={124}/>, moduleName)
            .then(({component, pageRouter}) => {
                const link = component.find("#list-link");
                expect(link).toBePresent();

//                link.simulate('click');
//                expect(pageRouter.open).toBeCalledWith(EntitiesListPage.key);
            })
    ));
});