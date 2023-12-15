import React from 'react';
import {createTestApp, waitActions, withMock} from "@efr/medservice-web-presentation-utils-test";
import moduleDefinition from '../../../index'
import EntitiesListComponent from "./EntitiesList";
import {EntityEditPage} from '../entity-edit';
import {EntitiesListAction} from "../../../actions/index"
import Mocks from '../../../actions/_mocks_'

const testApp = createTestApp(moduleDefinition);
const ENTITIES_LIST_FIXTURE = [
    {
        id: 1,
        name: 'Сущность номер раз'
    },
    {
        id: 2,
        name: 'Сущность номер два'
    }
];

const checkPanel = component => {
    const panel = component.findPanel("entities-list-panel");
    expect(panel).toBePresent();
    expect(panel.getLabel()).toEqual('EntitiesList');
    return panel;
};

const getGrid = component => {
    const panel = checkPanel(component);
    return panel.findGrid("entities-grid");
};

const getRows = component => {
    const grid = getGrid(component);
    expect(grid).toBePresent();

    return grid.getRows();

};

describe('EntitiesList', () => {
    test('Render empty entities', withMock(Mocks.ENTITIES_LIST.SUCCESS([]), () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component}) => {
                const grid = getGrid(component);
                expect(grid).toBePresent();

                expect(grid.getEmptyMessage()).toEqual("Нет данных");
                expect(grid.getRows()).not.toBePresent()
            })
    )));
    test('Render with timeout', withMock(Mocks.ENTITIES_LIST.TIMEOUT, () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component}) => {
                const panel = checkPanel(component);

                expect(panel.find("#error").text()).toEqual("Операция временно недоступна.");
                expect(panel.findGrid("entities-grid")).not.toBePresent();
            })
    )));
    test('Check columns', withMock(Mocks.ENTITIES_LIST.SUCCESS(ENTITIES_LIST_FIXTURE), () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component}) => {
                const grid = getGrid(component);
                expect(grid).toBePresent();

                const columns = grid.getColumns();
                expect(columns.length).toEqual(2);

                expect(columns[0]).toEqual({
                    key: 'id',
                    name: 'Идентификатор сущности'
                });

                expect(columns[1]).toEqual({
                    key: 'name',
                    name: 'Наименование сущности'
                });
            })
    )));

    test('Check rows content', withMock(Mocks.ENTITIES_LIST.SUCCESS(ENTITIES_LIST_FIXTURE), () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component}) => {
                const rows = getRows(component);
                expect(rows.length).toEqual(2);

                for (let i = 0; i < ENTITIES_LIST_FIXTURE.length; i++) {
                    const {idCell, nameCell} = rows.at(i).cells();

                    expect(idCell.text()).toEqual(ENTITIES_LIST_FIXTURE[i].id.toString());
                    expect(nameCell.text()).toEqual(ENTITIES_LIST_FIXTURE[i].name);
                }
            })
    )));

    const ERROR_MESSAGE = 'Some error!';
    test('Render error entities ', withMock(Mocks.ENTITIES_LIST.ERROR(500, ERROR_MESSAGE), () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component}) => {
                component.update();
                const panel = checkPanel(component);

                expect(panel.find("#error").text()).toEqual(ERROR_MESSAGE);
                expect(panel.findGrid("entities-grid")).not.toBePresent();
            })
    )));

    test('Click to back', withMock(Mocks.ENTITIES_LIST.SUCCESS([]), () => ( //TODO
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component, pageRouter}) => {
                const panel = checkPanel(component);
                const backButton = panel.findButton('button-back');
                expect(backButton).toBePresent();
                expect(backButton.getName()).toEqual("Назад");

                backButton.simulateClick();
                expect(pageRouter.back).toBeCalled();
            })
    )));

    test('Check cells click', withMock(Mocks.ENTITIES_LIST.SUCCESS(ENTITIES_LIST_FIXTURE), () => (
        testApp
            .render(<EntitiesListComponent/>)
            .then(waitActions(EntitiesListAction))
            .then(({component, pageRouter}) => {
                const rows = getRows(component);

                for (let i = 0; i < ENTITIES_LIST_FIXTURE.length; i++) {
                    const cells = rows.at(i).cells();
                    for (let cellName of Object.keys(cells)) {
                        cells[cellName].simulateClick();
                        expect(pageRouter.open).toBeCalledWith(EntityEditPage.key, ENTITIES_LIST_FIXTURE[i]);
                    }
                }
            })
    )));

    //TODO toolBar с кнопками зависимыми от прав
    //TODO выбор строк
});