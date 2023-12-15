import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import { Button, StandardIcons } from '../index';

const buttonId = "buttonId";
const buttonName = 'Button name';

let icon = StandardIcons.addLink;

describe('Button', () => {
    describe('Test render', () => {
        test('Render with name ', () => {
            let button = TestHelper.render(<Button name={buttonName} dataId={buttonId}/>);

            expect(button.text()).toEqual(buttonName);
            expect(button.find('.button-icon-item')).not.toBePresent();
            expect(button.hasClass('button-icon')).toEqual(false);
        });

        test('Check control`s identifier', () => {
            let button = TestHelper.render(<Button name={buttonName} dataId={buttonId}/>);

            expect(button.find('.buttons').prop('data-id')).toEqual(buttonId);
        });

        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            let button = TestHelper.render(<Button name={buttonName} dataId={buttonId} tabIndex={tabIndex}/>);

            expect(button.getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Control have icon attributes and type is secondary or secondaryGray => Control have icon', () => {
            const type = "secondary";

            let button = TestHelper.render(<Button type={type} icon={icon} name={buttonName} dataId={buttonId}/>);

            expect(button.hasClass('button-icon')).toEqual(true);
            expect(button.find('.button-icon-item')).toBePresent();
        });
        test('Control have icon attribute and haven`t secondary or secondaryGray type => Control haven`t icon', () => {

            let button = TestHelper.render(<Button icon={icon} name={buttonName} dataId={buttonId}/>);

            expect(button.hasClass('button-icon')).toEqual(false);
            expect(button.find('.button-icon-item')).not.toBePresent();
        });
        test('Check control default type', () => {
            let button = TestHelper.render(<Button name={buttonName} dataId={buttonId}/>);

            expect(button.hasClass('button-primary')).toEqual(true);
        });

        test('Check control type', () => {
            const type = "secondary";
            let button = TestHelper.render(<Button type={type} name={buttonName} dataId={buttonId}/>);

            expect(button.hasClass(`button-${type}`)).toEqual(true);
        });
    });

    describe('Test click', () => {
        test('When enabled button => onClick fired', () => {
            const onClick = jest.fn()
            let button = TestHelper.render(<Button name={buttonName} onClick={onClick} dataId={buttonId}/>);

            button.simulate('click')
            expect(onClick).toBeCalled()
        });

        test('Enabled button without onClick', () => {
            let button = TestHelper.render(<Button name={buttonName} dataId={buttonId}/>);

            button.simulate('click')
            expect(console.warn).not.toBeCalled()
            expect(console.error).not.toBeCalled()
        });

        test('When disabled button => onClick not fired', () => {
            const onClick = jest.fn()
            let button = TestHelper.render(<Button name={buttonName} onClick={onClick} disabled={true} dataId={buttonId}/>);

            button.simulate('click')
            expect(onClick).not.toBeCalled()
        });

        test('When click on Button => Parent`s onKeyPress event won`t called', () => {
            const onClick = jest.fn();
            const onKeyPress = jest.fn();
            let button = TestHelper.render(<div onKeyPress={onKeyPress}><Button name={buttonName} onClick={onClick} disabled={true} dataId={buttonId}/></div>);

            button.find(Button).simulate("keyPress", { which: 13 });
            expect(onKeyPress).not.toBeCalled()
        });
    });

});