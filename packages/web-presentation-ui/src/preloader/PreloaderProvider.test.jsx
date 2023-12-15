import React from 'react';
import TestHelper from '@efr/medservice-react-test'

import PreloaderProvider from './PreloaderProvider'

const hasPreloader = provider => {
    provider.update();
    expect(provider.find('.circle')).toBePresent();
    expect(provider.find('.area-for-loader')).toBePresent();
};

const hasNotPreloader = provider => {
    provider.update();
    expect(provider.find('.circle')).not.toBePresent();
    expect(provider.find('.area-for-loader')).not.toBePresent();
};

describe('PreloaderProvider', () => {
    describe('Render', () => {
        test('When test-app with 1 children=> success', () => {
            expect(() => {
                const provider = TestHelper.render(<PreloaderProvider>
                    <div/>
                </PreloaderProvider>);
                expect(provider).toBeDefined();
            }).not.toThrowError();
        });

        test('When test-app with few children=> success', () => {
            expect(() => {
                const provider = TestHelper.render(<PreloaderProvider>
                    <div/>
                    <div/>
                </PreloaderProvider>);
                expect(provider).toBeDefined();
            }).not.toThrowError();
        });

        test('When test-app without children=> success', () => {
            expect(() => {
                const provider = TestHelper.render(<PreloaderProvider/>);
                expect(provider.getDOMNode()).toBeNull();
            }).not.toThrowError();
        });
    });

    describe('ShowAndHidePreloader', () => {
        test('Show => Show', () => {
            const provider = TestHelper.render(<PreloaderProvider>
                <div/>
            </PreloaderProvider>);

            const myProvider = provider.instance();
            myProvider.show();

            hasPreloader(provider);
        });

        test('ManyHideOneShow => Show', () => {
            const provider = TestHelper.render(<PreloaderProvider>
                <div/>
            </PreloaderProvider>);

            let myProvider = provider.instance();
            myProvider.hide();
            myProvider.hide();
            myProvider.hide();
            myProvider.show();

            hasPreloader(provider);
        });

        test('ShowHide => Hide', () => {
            const provider = TestHelper.render(<PreloaderProvider>
                <div/>
            </PreloaderProvider>);

            const myProvider = provider.instance();
            myProvider.show();
            myProvider.hide();

            hasNotPreloader(provider);
        });

        test('ShowShowHideHide => Hide', () => {
            const provider = TestHelper.render(<PreloaderProvider>
                <div/>
            </PreloaderProvider>);

            const myProvider = provider.instance();
            myProvider.show();
            myProvider.show();
            myProvider.hide();
            myProvider.hide();

            hasNotPreloader(provider);
        });

        test('ShowHideShowHide => Hide', () => {
            const provider = TestHelper.render(<PreloaderProvider>
                <div/>
            </PreloaderProvider>);

            const myProvider = provider.instance();
            myProvider.show();
            myProvider.hide();
            myProvider.show();
            myProvider.hide();

            hasNotPreloader(provider);
        });
    });
});

