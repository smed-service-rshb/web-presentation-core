import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import {Tabs, Tab} from './index';
import {Item} from './Tabs';

describe('Tabs', () => {
    describe('Test render', () => {
        test('Count elements and labels name', () => {
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId="First_tab">
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab">
                        <div>This is my tab 2 contents!</div>
                    </Tab>
                    <Tab label="Third tab" dataId="Third_tab">
                        <div>This is my tab 3 contents!</div>
                    </Tab>
                </Tabs>
            );

            var labels = tabs.find(Item);

            expect(labels.length).toEqual(3);
            expect(labels.first().props().label).toEqual('First tab');
            expect(labels.at(1).props().label).toEqual('Second tab');
            expect(labels.at(2).props().label).toEqual('Third tab');
            expect(labels.find('.badge').exists()).toEqual(false);
        });

        test('Check default active tab => Only first tab is active ', () => {
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId="First_tab">
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab">
                        <div>This is my tab 2 contents!</div>
                    </Tab>
                    <Tab label="Third tab" dataId="Third_tab">
                        <div>This is my tab 3 contents!</div>
                    </Tab>
                </Tabs>
            );

            var labels = tabs.find(Item);
            expect(labels.first().props().active).toEqual(true);
            expect(labels.at(1).props().active).toEqual(false);
            expect(labels.at(2).props().active).toEqual(false);
        });

        test('Check active tab => Selected tab is active ', () => {
            let tabs = TestHelper.render(
                <Tabs selected={1}>
                    <Tab label="First tab" dataId="First_tab">
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab">
                        <div>This is my tab 2 contents!</div>
                    </Tab>
                    <Tab label="Third tab" dataId="Third_tab">
                        <div>This is my tab 3 contents!</div>
                    </Tab>
                </Tabs>
            );

            var labels = tabs.find(Item);
            expect(labels.first().props().active).toEqual(false);
            expect(labels.at(1).props().active).toEqual(true);
            expect(labels.at(2).props().active).toEqual(false);
        });


        test('Tab label text render', () => {
            const tabLabel = 'First tab';
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label={tabLabel} dataId="First_tab">
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                </Tabs>
            );

            var label = tabs.find(Item);
            expect(label.exists()).toEqual(true);
            expect(label.props().label).toEqual(tabLabel);
            expect(label.props().active).toEqual(true);
        });

        test('Check tab content => Control have content', () => {
            const FirstTab = () =>(<div></div>);
            const SecondTab = () =>(<span></span>);
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId="First_tab">
                        <FirstTab/>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab">
                        <SecondTab/>
                    </Tab>
                </Tabs>
            );

            expect(tabs.find(FirstTab).exists()).toEqual(true);
            expect(tabs.find(SecondTab).exists()).toEqual(false);
        });

        test('Check control`s identifier', () => {
            const tabId = 'TabId';
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId={tabId}/>
                </Tabs>
            );

            expect(tabs.find('li a').prop('data-id')).toEqual(tabId);
        });

        test('Check control`s notice', () => {
            const tabId = 'TabId';
            const badge = 2;
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId={tabId} badge={badge}/>
                </Tabs>
            );

            var label = tabs.find(Item);
            expect(label.find('.badge').exists()).toEqual(true);
        });

        test('Match type item ', () => {
            const tabId = 'TabId';
            const tabType = 'secondary';
            let tabs = TestHelper.render(
                <Tabs type={tabType}>
                    <Tab label="First tab" dataId={tabId}/>
                </Tabs>
            );

            expect(tabs.hasClass('tabs')).toEqual(true);
            expect(tabs.hasClass(`tab-${tabType}`)).toEqual(true);
        });

        test('Check tabIndex value ', () => {
            const tabId = 'TabId';
            const tabIndex = 2;
            let tabs = TestHelper.render(
                <Tabs>
                    <Tab label="First tab" dataId={tabId} tabIndex={tabIndex}/>
                </Tabs>
            );

            expect(tabs.find('.tabs__labels li a').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });

    describe('Test onClick', () => {
        test('When click on tab => onClick fired', () => {
            const FirstTab = () =>(<div></div>);
            const SecondTab = () =>(<span></span>);
            const onChange = jest.fn();

            let tabs = TestHelper.render(
                <Tabs onChange={onChange}>
                    <Tab label="First tab" dataId="First_tab">
                        <FirstTab/>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab">
                        <SecondTab/>
                    </Tab>
                </Tabs>
            );

            var labels = tabs.find(Item);

            labels.at(1).find('a').simulate('click');

            expect(onChange).toBeCalledWith(1);
        });

        test('When click on disabled tab => onClick not fired', () => {
            const onChange = jest.fn();

            const tabs = TestHelper.render(
                <Tabs onChange={onChange}>
                    <Tab label="First tab" dataId="First_tab">
                        <div/>
                    </Tab>
                    <Tab label="Second tab" dataId="Second_tab" disabled>
                        <div/>
                    </Tab>
                </Tabs>
            );

            const labels = tabs.find(Item);

            labels.at(1).find('a').simulate('click');

            expect(onChange).not.toBeCalled();
        });
    });

});