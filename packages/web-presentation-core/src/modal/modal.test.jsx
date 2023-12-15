import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import Modal from './modal';
import {Button} from '@efr/medservice-web-presentation-ui';

const buttonId = "buttonId";
const modalButton = [
    <Button name="Закрыть" onClick={jest.fn()} dataId={buttonId}/>
];
const modalId = "modalId";

describe.skip('Modal', () => {
    describe('Test render', () => {
        const title = 'Обратите внимание';
        const content = 'По заданным параметрам найдено более N результатов, задайте более точные критерии поиска.';

        test('Check title  => modal have title', () => {
            let modal = TestHelper.render(<Modal show title={title} dataId={modalId}/>);
            expect(modal.find('.popup-window-title').text()).toEqual(title);
            expect(modal.find('.popup-buttons-container')).not.toBePresent();
        });

        test('Check content  => modal have content', () => {
            let modal = TestHelper.render(<Modal show dataId={modalId}>{content}</Modal>);
            expect(modal.find('.popup-content-message-content').text()).toEqual(content)
        });

        test('Control have buttons attribute  => modal have buttons block', () => {
            let modal = TestHelper.render(<Modal show dataId={modalId} buttons={modalButton}>{content}</Modal>);
            expect(modal.find('.popup-buttons-container')).toBePresent();
        });

        test('Count modal buttons ', () => {
            let modal = TestHelper.render(<Modal show buttons={modalButton} dataId={modalId}/>);

            expect(modal.find('.popup-buttons-container').find(Button).length).toEqual(modalButton.length)
        });

        test('Check background ', () => {
            let modal = TestHelper.render(<Modal show dataId={modalId}/>);
            expect(modal.find('.popup-background').exists()).toEqual(true);
        });
        test('Empty modal buttons => Modal have default button ', () => {
            let modal = TestHelper.render(<Modal show dataId={modalId}/>);

            var button = modal.find(Button);

            expect(button.exists()).toEqual(true);
            expect(button.props().name).toEqual('Закрыть');
            expect(button.props().type).toEqual(Button.buttonTypes.secondary);
        });

        test('Show = false  => Modal is not show ', () => {
            let modal = TestHelper.render(<Modal dataId={modalId}/>);

            expect(modal.getDOMNode()).toBeNull()
        });

        test('Check control`s identifier', () => {
            let modal = TestHelper.render(<Modal dataId={modalId} show/>);

            expect(modal.find('.popup-background').prop('data-id')).toEqual(modalId);
        });

        test('Check render close button', () => {
            const close = 'закрыть';
            let modal = TestHelper.render(<Modal dataId={modalId} show/>);

            expect(modal.find('.popup-window-header-close').exists()).toEqual(true);
            expect(modal.find('.popup-window-header-close').text()).toEqual(close);
        });

    });

    describe('Test onClick', () => {
        test('Test onClick event default button => onClick fired', () => {
            const onClose = jest.fn();
            let modal = TestHelper.render(<Modal show onClose={onClose} dataId={modalId}/>);

            modal.find('.popup-buttons-container').find(Button).simulate('click');
            expect(onClose).toBeCalled()
        });

    });
});