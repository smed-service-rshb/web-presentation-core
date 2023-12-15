import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Notification from './index';


describe('Notification', () => {
    describe('Test render', () => {
        test('Render notification`s content', () => {
            const notificationText = 'Notification text';
            let notification = TestHelper.render(<Notification>{notificationText}</Notification>);

            expect(notification.text()).toEqual(notificationText);
            expect(notification.hasClass('notification-warning')).toEqual(true);
            expect(notification.find('.notification-title')).not.toBePresent();
        });
        test('Match type item', () => {
            const notificationType = 'error';
            const errorTitle = 'Ошибки';
            let notification = TestHelper.render(<Notification type={notificationType}/>);

            expect(notification.hasClass(`notification-${notificationType}`)).toEqual(true);
            expect(notification.find('.notification-subtitle')).toBePresent();
            expect(notification.find('.notification-subtitle').text()).toEqual(errorTitle);
        });
        test('Control have title', () => {
            const title = 'Title:';
            let notification = TestHelper.render(<Notification title={title}/>);

            expect(notification.find('.notification-title')).toBePresent();
            expect(notification.find('.notification-title').text()).toEqual(title);
        });
        test('Check render close button', () => {
            const close = 'Закрыть';
            const onClose = jest.fn();
            let notification = TestHelper.render(<Notification onClose={onClose}/>);

            expect(notification.find('.notification-close')).toBePresent();
            expect(notification.find('.notification-close').text()).toEqual(close);
        });
        test('Error type item without subtitle', () => {
            const notificationType = 'error';
            const notification = TestHelper.render(<Notification type={notificationType} isErrorsTitleRequired={false}/>);

            expect(notification.hasClass(`notification-${notificationType}`)).toEqual(true);
            expect(notification.find('.notification-subtitle')).not.toBePresent();
        });
    });

    describe('Test onClick', () => {
        test('When click on close button => onClick fired', () => {
            const onClose = jest.fn();
            let notification = TestHelper.render(<Notification onClose={onClose}/>);

            notification.find('.notification-close').simulate('click');
            expect(onClose).toBeCalled();
        });
        test('When click outside close button => onClick won`t fired', () => {
            const onClose = jest.fn();
            let notification = TestHelper.render(<Notification onClose={onClose}/>);

            notification.simulate('click');
            expect(onClose).not.toBeCalled();
        });
    });
});