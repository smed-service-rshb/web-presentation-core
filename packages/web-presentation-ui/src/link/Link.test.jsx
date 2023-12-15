import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import { Link, StandardIcons } from '../index';

const linkId = "link1";
let icon = StandardIcons.addLink;

describe('Link', () => {
    describe('Test render', () => {
        test('Render link`s content', () => {
            const linkText = 'Link text';
            let link = TestHelper.render(<Link dataId={linkId}>{linkText}</Link>);

            expect(link.text()).toEqual(linkText);
            expect(link.hasClass('link-icon')).toEqual(false);
        });
        test('Check target value', () => {
            const targetValue = '_blank';
            let link = TestHelper.render(<Link target={targetValue} dataId={linkId}/>);

            expect(link.getDOMNode().target).toEqual(targetValue);
        });
        test('Check href value', () => {
            const hrefValue = 'http://yandex.ru/';
            let link = TestHelper.render(<Link href={hrefValue} dataId={linkId}/>);

            expect(link.getDOMNode().href).toEqual(hrefValue);
        });
        test('Control have onClick => Control have href value', () => {
            const onClick = jest.fn();
            const hrefValue = 'http://yandex.ru/';
            let link = TestHelper.render(<Link href={hrefValue} onClick={onClick} dataId={linkId}/>);

            expect(link.getDOMNode().href).toEqual(hrefValue);
        });
        test('Check control`s identifier', () => {
            const onClick = jest.fn();
            let link = TestHelper.render(<Link onClick={onClick} dataId={linkId}/>);

            expect(link.find('.link').prop('data-id')).toEqual(linkId);
        });
        test('Check control`s type', () => {
            const onClick = jest.fn();
            const linkType = 'pseudo';
            let link = TestHelper.render(<Link type={linkType} onClick={onClick} dataId={linkId}/>);

            expect(link.hasClass(`link-${linkType}`)).toEqual(true);
        });
        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const onClick = jest.fn();
            let link = TestHelper.render(<Link onClick={onClick} tabIndex={tabIndex} dataId={linkId}/>);

            expect(link.getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Check icon attribute => Control will render with icon ', () => {
            const onClick = jest.fn();
            let link = TestHelper.render(<Link onClick={onClick} icon={icon} dataId={linkId}/>);

            expect(link.hasClass('link-icon')).toEqual(true);
            expect(link.find('.link-icon-item')).toBePresent(true);
        });
    });

    describe('Test click', () => {
        test('When enabled link => onClick fired', () => {
            const onClick = jest.fn();
            let link = TestHelper.render(<Link onClick={onClick} dataId={linkId}/>);

            var event = {target: {id:12}};
            link.simulate('click', event);
            expect(onClick).toBeCalledWith(expect.objectContaining(event));
        });
        test('Control have href and onClick => onClick fired', () => {
            const onClick = jest.fn();
            const hrefValue = 'http://yandex.ru/';
            let link = TestHelper.render(<Link onClick={onClick}  href={hrefValue} dataId={linkId}/>);

            link.simulate('click');
            expect(onClick).toBeCalled();
        });

        test('Enabled link without onClick', () => {
            let link = TestHelper.render(<Link dataId={linkId}/>);

            link.simulate('click');
            expect(console.warn).not.toBeCalled();
            expect(console.error).not.toBeCalled();
        });

        test('Disabled link => onClick will not fired', () => {
            const onClick = jest.fn();
            let link = TestHelper.render(<Link disabled onClick={onClick} dataId={linkId}/>);

            link.simulate('click');
            expect(onClick).not.toBeCalled();
        });
        test('When clicked on icon => onClick fired', () => {
            const onClick = jest.fn();
            let link = TestHelper.render(<Link onClick={onClick} icon={icon} dataId={linkId}/>);

            link.find('.link-icon-item').simulate('click');
            expect(onClick).toBeCalled();
        });
    });

});