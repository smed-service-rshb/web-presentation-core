import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Dropdown from './index';

const firstId = '1';
const secondId = '2';
const thirdId = '3';

const firstName = 'Link 1';
const dropdowns = [
    {name: firstName, id: firstId, onClick: jest.fn()},
    {name: 'Link 2', id: secondId, onClick: jest.fn()},
    {name: 'Link 3', id: thirdId, onClick: jest.fn()}
];

const dropdownId = 'dropdownId';
const dropdownName = 'Операции';

describe('Dropdown', () => {
    describe('Test render', () => {
        test('Render control => Control exists ', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName}/>);

            expect(dropdown.find('.dropdown').exists()).toEqual(true);
            expect(dropdown.find('.dropdown').text()).toEqual(dropdownName);
            expect(dropdown.find('.dropdown-list').exists()).toEqual(false);
            expect(dropdown.props().id).toEqual(dropdownId);
        });
        test('Empty elements => Control won`t render', () => {
            let dropdown = TestHelper.render(<Dropdown values={[]} id={dropdownId} name={dropdownName}/>);

            expect(dropdown.getDOMNode()).toBeNull();
        });
        test('When clicked on dropdown control => Dropdown options rendered', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName}/>);

            expect(dropdown.find('.dropdown-list').exists()).toEqual(false);
            expect(dropdown.find('.dropdown-list-item').exists()).toEqual(false);

            dropdown.find('.dropdown-button').simulate('click');
            expect(dropdown.find('.dropdown-list').exists()).toEqual(true);
            expect(dropdown.find('.dropdown-list-item').length).toEqual(dropdowns.length)
        });


        test('Check render options', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName}/>);

            dropdown.find('.dropdown-button').simulate('click');
            expect(dropdown.find('.dropdown-list').exists()).toEqual(true);

            dropdowns.forEach((dd, i) => {
                expect(dropdown.find('.dropdown-list-item').at(i).text()).toEqual(dd.name);
                expect(dropdown.find('.dropdown-list-item').at(i).props().id).toEqual(dd.id);
                expect(dropdown.find('.dropdown-list-item').at(i).prop('data-id')).toEqual(dd.id);
            });
        });

        test('When component is disabled => options won`t show', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} disabled
                                                       name={dropdownName}/>);

            dropdown.find('.dropdown-button').simulate('click');
            expect(dropdown.find('.dropdown-list').exists()).toEqual(false);
        });

        test('Check control`s identifier', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName}/>);

            expect(dropdown.find('.dropdown-button').prop('data-id')).toEqual(dropdownId);
        });

        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName} tabIndex={tabIndex}/>);

            expect(dropdown.find('.dropdown-button').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });

    describe('Test onClick', () => {
        test('When onClick on option=> onClick fired', () => {
            let dropdown = TestHelper.render(<Dropdown values={dropdowns} id={dropdownId} name={dropdownName}/>);

            dropdowns.forEach((dd, i) => {
                dropdown.find('.dropdown-button').simulate('click');
                expect(dropdown.find('.dropdown-list').exists()).toEqual(true);

                dropdown.find('.dropdown-list-item').at(i).simulate('click');

                 expect(dd.onClick).toBeCalled();
                 expect(dropdown.find('.dropdown-list').exists()).toEqual(false);
            });
        });
    })
});
