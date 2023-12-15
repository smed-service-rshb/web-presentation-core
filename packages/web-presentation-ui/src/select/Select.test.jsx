import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Select from './index';

const selectId = "link1";

const firstId = '1';
const secondId = '2';
const thirdId = '3';

const options = [
    {value: firstId, label: 'Первый вариант'},
    {value: secondId, label: 'Второй вариант'},
    {value: thirdId, label: 'Третий вариант'}
];

const LEFT_MOUSE_BUTTON =  {button: 0};

describe('Select', () => {
    describe('Test render', () => {

        test('When component have id => Rendered component have id attribute ', () => {
            const identifier = 'selectID';
            const select = TestHelper.render(<Select options={options} id={identifier} dataId={selectId}/>);

            expect(select.find('.select-wrapper').props().id).toEqual(identifier)
        });

        test('When have preset value => Component render selected option ', () => {
            const selected = options[1];
            const select = TestHelper.render(<Select options={options} value={selected.value} dataId={selectId}/>);

            expect(select.find('.Select-value-label').exists()).toEqual(true);
            expect(select.find('.Select-value-label').text()).toEqual(selected.label);

            select.find('.Select-control').simulate('mousedown', LEFT_MOUSE_BUTTON);
            expect(select.find('div.Select-option.is-selected').text()).toEqual(selected.label);

        });

        test('When have preset placeholder and have not preset value => Component render placeholder ', () => {
            const placeholder = 'placeholder';
            const select = TestHelper.render(<Select options={options} placeholder={placeholder} dataId={selectId}/>);

            expect(select.find('.Select-value-label').exists()).toEqual(false);
            expect(select.find('.Select-placeholder').exists()).toEqual(true);
            expect(select.find('.Select-placeholder').text()).toEqual(placeholder)
        });

        test('When have preset placeholder and have value => Component render selected option ', () => {
            const selected = options[0];
            const select = TestHelper.render(<Select options={options} value={selected.value} dataId={selectId}/>);

            expect(select.find('.Select-value-label').exists()).toEqual(true);
            expect(select.find('.Select-placeholder').exists()).toEqual(false);
            expect(select.find('.Select-value-label').text()).toEqual(selected.label)
        });

        test('When have not preset placeholder and have not preset value => Component render empty option ', () => {
            const select = TestHelper.render(<Select options={options} dataId={selectId}/>);

            expect(select.find('.Select-value-label').exists()).toEqual(false);
            expect(select.find('.Select-placeholder').exists()).toEqual(true);
            expect(select.find('.Select-placeholder').text()).toEqual('')
        });

        test('Empty option elements => Component won`t render ', () => {
            const select = TestHelper.render(<Select dataId={selectId}/>);

            expect(select.getDOMNode()).toBeNull()
        });

        test('When mouse down on select control=> Select options rendered', () => {
            const select = TestHelper.render(<Select options={options} dataId={selectId}/>);

            expect(select.find('.Select-menu').exists()).toEqual(false);
            expect(select.find('.Select-option').exists()).toEqual(false);

            select.find('.Select-control').simulate('mousedown', LEFT_MOUSE_BUTTON);
            expect(select.find('.Select-menu').exists()).toEqual(true);
            expect(select.find('div.Select-option').length).toEqual(options.length)
        });

        test('When component is disabled=> options won`t show', () => {
            const select = TestHelper.render(<Select options={options} disabled dataId={selectId}/>);

            select.find('.Select-control').simulate('mousedown', LEFT_MOUSE_BUTTON);

            expect(select.find('.Select-menu-outer').exists()).toEqual(false);
        });
        test('Check control`s identifier', () => {
            const select = TestHelper.render(<Select dataId={selectId} options={options}/>);

            expect(select.find('.select-wrapper').prop('data-id')).toEqual(selectId);
        });
        test('Control default width => Control have width', () => {
            const controlWidth= "20%";
            const select = TestHelper.render(<Select dataId={selectId} options={options} width={controlWidth}/>);

            expect(select.getDOMNode().style.width).toEqual(controlWidth);
        });
        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const select = TestHelper.render(<Select dataId={selectId} options={options} tabIndex={tabIndex}/>);

            expect(select.getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Control in focus => Options menu was open', () => {
            const select = TestHelper.render(<Select dataId={selectId} options={options}/>);
            select.find('.Select-input').simulate('focus');

            expect(select.find('.Select-menu-outer')).toBePresent();
        });
    });
    describe('Test onChange', () => {
        test('When mouse down on option=> onChange fired', () => {
            const onChange = jest.fn();
            const selectedOption = 1;

            const select = TestHelper.render(<Select options={options} onChange={onChange} dataId={selectId}/>);

            select.find('.Select-control').simulate('mousedown', LEFT_MOUSE_BUTTON);
            select.find('div.Select-option').at(selectedOption).simulate('mousedown' , LEFT_MOUSE_BUTTON);

            expect(onChange).toHaveBeenCalledWith(options[selectedOption]);
        });
    })
});
