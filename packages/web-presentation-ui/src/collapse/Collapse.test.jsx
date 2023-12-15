import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Collapse from './index';

const content = 'Content';
const openText = 'Open text';
const hideText = 'Hide text';
const collapseId = 'CollapseId';
const onClick = jest.fn();

describe('Collapse', () => {
    describe('Test render', () => {
        test('Check text render', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                          dataId={collapseId}
                          openText={openText}
                          hideText={hideText}>
                    {content}
                </Collapse>
            );

            expect(collapse.find('.Collapsible__trigger').text()).toEqual(openText);
            expect(collapse.hasClass('collapse-opened')).toEqual(false);
            expect(collapse.hasClass('collapse-primary')).toEqual(true);
            expect(collapse.hasClass('disabled')).toEqual(false);
            expect(collapse.hasClass('unclosed')).toEqual(false);
            expect(collapse.find('.Collapsible__contentOuter')).toBePresent();
            expect(collapse.find('.collapse-right-text')).not.toBePresent();
            expect(collapse.find('.collapse-left-text')).not.toBePresent();
        });
        test('Check control type', () => {
            const controlType = 'secondary';
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                          dataId={collapseId}
                          openText={openText}
                          hideText={hideText}
                          type={controlType}>
                    {content}
                </Collapse>
            );

            expect(collapse.hasClass('collapse-secondary')).toEqual(true);
        });
        test('Control initial open => Control change link text and have control', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                          dataId={collapseId}
                          openText={openText}
                          hideText={hideText}
                          isOpened>
                    {content}
                </Collapse>
            );

            expect(collapse.find('.Collapsible__trigger').text()).toEqual(hideText);
            expect(collapse.hasClass('collapse-opened')).toEqual(true);
            expect(collapse.find('.Collapsible__contentOuter').text()).toEqual(content);
        });
        test('Check control`s identifier ', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                          dataId={collapseId}
                          openText={openText}
                          hideText={hideText}>
                    {content}
                </Collapse>
            );

            expect(collapse.find('.collapse').prop('data-id')).toEqual(collapseId);
        });
        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    tabIndex={tabIndex}>
                        {content}
                </Collapse>
            );

            expect(collapse.getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Check rightData value and haven`t rightDataWidth => rightData block won`t have width', () => {
            const Element = () =>(<div></div>);
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    rightData={<Element/>}>
                        {content}
                </Collapse>
            );

            expect(collapse.find(Element)).toBePresent();
            expect(collapse.find('.collapse-right-text').getDOMNode().style.width).not.toBePresent();
        });
        test('Check rightData value and have rightDataWidth => rightData block will have width', () => {
            const Element = () =>(<div></div>);
            const rightDataWidth = '160px';
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    rightDataWidth={rightDataWidth}
                    rightData={<Element/>}>
                        {content}
                </Collapse>
            );

            expect(collapse.find('.collapse-right-text')).toBePresent();
            expect(collapse.find('.collapse-right-text').getDOMNode().style.width).toEqual(rightDataWidth);
        });
        test('Check leftData value => Control will render with leftData', () => {
            const Element = () =>(<div></div>);
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    leftData={<Element/>}>
                        {content}
                </Collapse>
            );

            expect(collapse.find('.collapse-left-text')).toBePresent();
        });
        test('Control haven`t children => Control will render without children', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    />
            );

            expect(collapse.find('.Collapsible__contentInner_style')).not.toBePresent();
        });
        test('Control is opened and haven`t children => Control will render without children', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                    dataId={collapseId}
                    openText={openText}
                    hideText={hideText}
                    isOpened/>
            );

            expect(collapse.find('.Collapsible__contentInner_style')).not.toBePresent();
        });
    });

    describe('Test onClick', () => {
        test('When click on component => onClick fired', () => {
            let collapse = TestHelper.render(
                <Collapse onClick={onClick}
                          dataId={collapseId}
                          openText={openText}
                          hideText={hideText}>
                    {content}
                </Collapse>
            );
            collapse.find('.Collapsible__trigger').simulate('click');
            expect(onClick).toBeCalled();
        });
    });
    test('When control is disabled  => onClick not fired', () => {
        const onClick = jest.fn();
        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      hideText={hideText}>
                {content}
            </Collapse>);

        collapse.simulate('click');
        expect(onClick).not.toBeCalled();
    });
    test('Click on rightData  => Collapse onClick not fired', () => {
        const onClick = jest.fn();
        const Element = () =>(<div></div>);

        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      rightData={<Element/>}
                      hideText={hideText}>
                {content}
            </Collapse>);

        collapse.find(Element).simulate('click');
        expect(onClick).not.toBeCalled();
    });

    test('Control have attribute unclosed  => Collapse onClick will fired', () => {
        const onClick = jest.fn();

        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      hideText={hideText}
                      unclosed>
                {content}
            </Collapse>);

        expect(collapse.hasClass('unclosed')).toEqual(true);

        collapse.find('.Collapsible__trigger').simulate('click');
        expect(onClick).toBeCalled();
    });
    test('Control is isOpened and unclosed  => Collapse onClick won`t fired', () => {
        const onClick = jest.fn();

        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      hideText={hideText}
                      isOpened
                      unclosed>
                {content}
            </Collapse>);

        expect(collapse.hasClass('disabled')).toEqual(true);
        expect(collapse.hasClass('unclosed')).toEqual(true);

        collapse.find('.Collapsible__trigger').simulate('click');
        expect(onClick).not.toBeCalled();
    });
    test('Control is isOpened and haven`t children  => Collapse onClick won`t fired', () => {
        const onClick = jest.fn();

        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      hideText={hideText}
                      isOpened
                      unclosed/>);

        collapse.find('.Collapsible__trigger').simulate('click');
        expect(onClick).not.toBeCalled();
    });
    test('Control isn`t opened and haven`t children  => Collapse onClick will fired', () => {
        const onClick = jest.fn();

        let collapse = TestHelper.render(
            <Collapse onClick={onClick}
                      dataId={collapseId}
                      openText={openText}
                      hideText={hideText}/>);

        collapse.find('.Collapsible__trigger').simulate('click');
        expect(onClick).toBeCalled();
    });


});