import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import PreloaderProvider from './PreloaderProvider'
import withPreloader from './withPreloader'

const FirstComponentForWrap = () => (<div/>);
const SecondComponentForWrap = () => (<div/>);

const hasPreloader = provider =>{
    provider.update();
    expect(provider.find('.circle')).toBePresent();
    expect(provider.find('.area-for-loader')).toBePresent();
    expect(provider.find('.circle').length).toEqual(1);
    expect(provider.find('.area-for-loader').length).toEqual(1);
    expect(provider.find(FirstComponentForWrap)).toBePresent();
};

const hasNotPreloader = provider =>{
    provider.update();
    expect(provider.find('.circle')).not.toBePresent();
    expect(provider.find('.area-for-loader')).not.toBePresent();
    expect(provider.find(FirstComponentForWrap)).toBePresent();
};


describe('withPreloader', () => {
    describe('Render', () => {
        test('When test-app with preloader => success', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);

            expect(() => {
                const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);
                expect(provider.find(FirstComponentForWrap)).toBePresent();
                hasNotPreloader(provider);
            }).not.toThrowError();
        });
    });

    describe('ShowAndHideWithPreloader', () => {
        test('Show => Show', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);
            const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);

            const myWithPreloaderComponent = provider.find(FirstComponentForWrap);

            myWithPreloaderComponent.props().preloader.show();

            hasPreloader(provider);
        });

        test('ManyHideOneShow => Show', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);
            const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);

            const myWithPreloaderComponent = provider.find(FirstComponentForWrap);

            myWithPreloaderComponent.props().preloader.hide();
            myWithPreloaderComponent.props().preloader.hide();
            myWithPreloaderComponent.props().preloader.hide();
            myWithPreloaderComponent.props().preloader.show();

            hasPreloader(provider);
        });

        test('ShowHide => Hide', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);
            const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);

            const myWithPreloaderComponent = provider.find(FirstComponentForWrap);

            myWithPreloaderComponent.props().preloader.show();
            myWithPreloaderComponent.props().preloader.hide();


            hasNotPreloader(provider);
        });

        test('ShowShowHideHide => Hide', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);
            const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);

            const myWithPreloaderComponent = provider.find(FirstComponentForWrap);

            myWithPreloaderComponent.props().preloader.show();
            myWithPreloaderComponent.props().preloader.show();
            myWithPreloaderComponent.props().preloader.hide();
            myWithPreloaderComponent.props().preloader.hide();

            hasNotPreloader(provider);
        });

        test('ShowHideShowHide => Hide', () => {
            const WithPreloaderComponent = withPreloader(FirstComponentForWrap);
            const provider = TestHelper.render(<PreloaderProvider><WithPreloaderComponent/></PreloaderProvider>);

            const myWithPreloaderComponent = provider.find(FirstComponentForWrap);

            myWithPreloaderComponent.props().preloader.show();
            myWithPreloaderComponent.props().preloader.hide();
            myWithPreloaderComponent.props().preloader.show();
            myWithPreloaderComponent.props().preloader.hide();

            hasNotPreloader(provider);
        });

        test('TwoComponentWithPreloader => success', () => {
            const FirstWrapComponent = withPreloader(FirstComponentForWrap);
            const SecondWrapComponent = withPreloader(SecondComponentForWrap);

            const provider = TestHelper.render(
                <PreloaderProvider>
                    <div>
                        <FirstWrapComponent/>
                        <SecondWrapComponent/>
                    </div>
                </PreloaderProvider>
            );

            const myFirstWrapComponent = provider.find(FirstComponentForWrap);
            myFirstWrapComponent.props().preloader.show();

            const mySecondWrapComponent = provider.find(FirstComponentForWrap);
            mySecondWrapComponent.props().preloader.show();


            hasPreloader(provider);
        });
    });
});
