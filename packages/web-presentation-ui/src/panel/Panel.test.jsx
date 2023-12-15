import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Panel from './index';

const render = (label, hint, labelSecondary, Children) => {
    const dataId = 'someID';
    let panel = TestHelper.render(<Panel label={label} hint={hint} labelSecondary={labelSecondary} dataId={dataId}>{Children && <Children/>}</Panel>);

    const wrapper = panel.find('.panel-wrapper');
    expect(wrapper).toBePresent();
    expect(wrapper.prop('data-id')).toEqual(dataId);

    return panel;
};
describe('Panel', () => {
    describe('Test render', () => {
        test('Control have label ', () => {
            const panelLabel = 'Panel label';
            let panel = render(panelLabel);

            expect(panel.find('.panel-label').text()).toEqual(panelLabel);
            expect(panel.find('.panel-label-secondary')).not.toBePresent();
            expect(panel.find('.panel-label .panel-label-hint')).not.toBePresent();
        });

        test('Control have label and hint with type array', () => {
            const panelLabel = 'Panel label';
            const hint = [<div>Hint content</div>];
            let panel = render(panelLabel, hint);

            expect(panel.find('.panel-label')).toBePresent();
        });

        test('Control have label and hint with type element ', () => {
            const panelLabel = 'Panel label';
            const hint = <div>Hint content</div>;
            let panel = render(panelLabel, hint);

            expect(panel.find('.panel-label')).toBePresent();
        });

        test('Control have label and hint with type string ', () => {
            const panelLabel = 'Panel label';
            const hint = 'Panel label';
            let panel = render(panelLabel, hint);

            expect(panel.find('.panel-label')).toBePresent();
        });

        test('Control haven`t label and have hint', () => {
            const hint = [<div>Hint content</div>];
            let panel = render(undefined, hint);

            expect(panel.find('.panel-label')).not.toBePresent();
        });

        test('Control have labelSecondary ', () => {
            const labelSecondaryText = 'Panel label secondary';
            let panel = render(undefined, undefined, labelSecondaryText);

            expect(panel.find('.panel-label-secondary').text()).toEqual(labelSecondaryText);
            expect(panel.find('.panel-label')).not.toBePresent();
        });

        test('Control have label and labelSecondary ', () => {
            const panelLabel = 'Panel label';
            const labelSecondaryText = 'Panel label secondary';
            let panel = render(panelLabel, undefined, labelSecondaryText);

            expect(panel.find('.panel-label-secondary')).toBePresent();
            expect(panel.find('.panel-label')).toBePresent();
        });

        test('Control have not label ', () => {
            let panel = render();

            expect(panel.find('.panel-label')).not.toBePresent();
            expect(panel.find('.panel-label-secondary')).not.toBePresent();
        });

        test('Control have content ', () => {
            const PanelContent = () => (<div>345</div>);
            let panel = render(undefined, undefined, undefined, PanelContent);

            const content = panel.find('.panel-content');
            expect(content).toBePresent();
            expect(content.find(PanelContent)).toBePresent();
        });
    });

});