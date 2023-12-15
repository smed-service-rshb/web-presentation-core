import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import BlockPreloader from "./BlockPreloader";

const Component = () => (<div/>);

const hasPreloader = (testApp, count) =>{
    expect(testApp.find('.preloader-container-block').length).toEqual(count);
    expect(testApp.find('.circle-block').length).toEqual(count);
    expect(testApp.find('.preloader-text-block').length).toEqual(count);
};

const hasNotBlockPreloader = testApp =>{
    expect(testApp.find('.preloader-container-block')).not.toBePresent();
    expect(testApp.find('.circle-block')).not.toBePresent();
    expect(testApp.find('.preloader-text-block')).not.toBePresent();
};


describe('BlockPreloader', () => {
    describe('Render', () => {
        test('When test-app without BlockPreloaderWithComponent => success', () => {
            expect(() => {
                const testApp = TestHelper.render(<BlockPreloader active={false}><Component/></BlockPreloader>);
                expect(testApp.find(Component)).toBePresent();
                hasNotBlockPreloader(testApp);
            }).not.toThrowError();
        });

        test('When test-app with BlockPreloaderWithComponent => success', () => {
            expect(() => {
                const testApp = TestHelper.render(<BlockPreloader active={true}><Component/></BlockPreloader>);
                expect(testApp.find(Component)).not.toBePresent();
                hasPreloader(testApp, 1);
            }).not.toThrowError();
        });

        test('When test-app without BlockPreloaderWithoutComponent => success', () => {
            expect(() => {
                const testApp = TestHelper.render(<BlockPreloader active={false}/>);
                hasNotBlockPreloader(testApp);
            }).not.toThrowError();
        });

        test('When test-app without BlockPreloaderWithoutProps => success', () => {
            expect(() => {
                const testApp = TestHelper.render(<BlockPreloader/>);
                hasNotBlockPreloader(testApp);
            }).not.toThrowError();
        });

        test('When test-app with BlockPreloaderWithoutComponent => success', () => {
            expect(() => {
                const testApp = TestHelper.render(<BlockPreloader active={true}/>);
                hasPreloader(testApp, 1);
            }).not.toThrowError();
        });

        test('When test-app without BlockPreloader => success', () => {
            expect(() => {
                const testApp = TestHelper.render(
                <div>
                    <BlockPreloader active={true}><Component/></BlockPreloader>
                    <BlockPreloader active={false}><Component/></BlockPreloader>
                    <BlockPreloader active={true}><Component/></BlockPreloader>
                    <BlockPreloader active={false}><Component/></BlockPreloader>
                    <BlockPreloader active={true}><Component/></BlockPreloader>
                </div>
                );
                expect(testApp.find(Component).length).toEqual(2);
                hasPreloader(testApp, 3);
            }).not.toThrowError();
        });
    });
});
