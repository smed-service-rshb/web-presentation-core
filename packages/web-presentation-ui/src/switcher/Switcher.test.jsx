import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Switcher from './index';
import RadioButton from '../radio-button'

const firstId = '1';
const secondId = '2';
const thirdId = '3';
const switchers = [
    {name: 'first value', id: firstId, tabIndex: 1},
    {name: 'second value', id: secondId, tabIndex: 2},
    {name: 'third value', id: thirdId, tabIndex: 3}
];
const dataId = 'test-data-id';

const onChangeEmpty = () => {};
const activeClass = 'currentSwitcher';

describe('Switcher', () => {
    describe('Test render', () => {
        test('Count elements ', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty}/>);
            expect(switcher.find('li').length).toEqual(switchers.length)
        });
        test('Check control`s identifier ', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty}/>);

            expect(switcher.find('.switcher-item').at(0).prop('data-id')).toEqual(firstId);
        });

        test('Check control`s identifier with parent dataId ', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty} dataId={dataId}/>);

            expect(switcher.find('.switcher-item').at(0).prop('data-id')).toEqual(dataId+firstId);
        });

        test('Empty elements ', () => {
            let switcher = TestHelper.render(<Switcher values={[]} onChange={onChangeEmpty}/>);
            expect(switcher.getDOMNode()).toBeNull()
        });

        test('Match type item ', () => {
            const switcherType = 'secondary';
            let switcher = TestHelper.render(<Switcher type={switcherType} values={switchers} onChange={onChangeEmpty}/>);

            expect(switcher.find('ul').hasClass('switcher_labels')).toEqual(true);
            expect(switcher.find('ul').hasClass(`switcher-${switcherType}`)).toEqual(true);
        });

        test('Control have radio type => Control have RadioButton component ', () => {
            const switcherType = 'radio';
            let switcher = TestHelper.render(<Switcher type={switcherType} values={switchers} onChange={onChangeEmpty}/>);

            expect(switcher.find(RadioButton)).toBePresent();
        });

        test('Control have radioVerticalList type => Control have RadioButton component ', () => {
            const switcherType = 'radioVerticalList';
            let switcher = TestHelper.render(<Switcher type={switcherType} values={switchers} onChange={onChangeEmpty}/>);

            expect(switcher.find(RadioButton)).toBePresent();
        });


        test('When haven`t selected => No one element is selected', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty} unSelectable/>);

            switchers.forEach(item=>{
                expect(switcher.find(`[id='${item.id}']`).hasClass(activeClass)).toEqual(false);
            })
        });

        test('When second element is selected  => first and third elements are unselected', () => {
            const selectedId = secondId;
            let switcher = TestHelper.render(<Switcher values={switchers} selected={selectedId} onChange={onChangeEmpty}/>);

            switchers.forEach(item=>{
                expect(switcher.find(`[id='${item.id}']`).hasClass(activeClass)).toEqual(item.id===selectedId);
            })
        });

        test('Check tabIndex value ', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty}/>);

            switchers.forEach((item, i)=>{
                expect(switcher.find('.switcher-item').at(i).props().tabIndex).toEqual(item.tabIndex);
            });
        });

        test('Control is disabled', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty} disabled/>);

            expect(switcher.find('.switcher_labels').hasClass('disabled')).toEqual(true);
        });

        test('Control type radio is disabled => RadioButton is disabled', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty} disabled type="radio"/>);

            switchers.forEach((item, i)=>{
                expect(switcher.find('.radio').at(i).props().disabled).toBePresent();
            });
        });

        test('Control type radioVerticalList is disabled => RadioButton is disabled', () => {
            let switcher = TestHelper.render(<Switcher values={switchers} onChange={onChangeEmpty} disabled type="radioVerticalList"/>);

            switchers.forEach((item, i)=>{
                expect(switcher.find('.radio').at(i).props().disabled).toBePresent();
            });
        });
    });

    describe('Test onChange', () => {
        test('When click unselected => onChange fired with selected value', () => {
            const onChange = jest.fn();

            let switcher = TestHelper.render(<Switcher values={switchers} selected={secondId} onChange={onChange}/>);

            const clickedId = firstId;
            switcher.find(`button[id='${clickedId}']`).simulate('click');

            expect(onChange).toHaveBeenCalledWith(clickedId);
        });

        test('When click selected item and haven`t unSelectable => onChange not fired', () => {
            const onChange = jest.fn();

            const selectedId = secondId;
            let switcher = TestHelper.render(<Switcher values={switchers} selected={selectedId} onChange={onChange}/>);

            switcher.find(`button[id='${selectedId}']`).simulate('click');

            expect(onChange).not.toBeCalled()
        });

        test('When click selected item and have unSelectable => onChange will fired', () => {
            const onChange = jest.fn();
            const selectedId = secondId;
            let switcher = TestHelper.render(<Switcher values={switchers} selected={selectedId} onChange={onChange} unSelectable/>);

            switcher.find(`button[id='${selectedId}']`).simulate('click');

            expect(onChange).toBeCalledWith(null)
        });

        test('When click on disabled control => onChange not fired', () => {
            const onChange = jest.fn();
            const selectedId = secondId;
            const clickedId = firstId;
            let switcher = TestHelper.render(<Switcher values={switchers} selected={selectedId} onChange={onChange} disabled/>);

            switcher.find(`button[id='${clickedId}']`).simulate('click');

            expect(onChange).not.toBeCalled()
        });

    });
});
