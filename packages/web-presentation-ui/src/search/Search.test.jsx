import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Search from './index';
import Link from './../link'

const dataId = "dataId";

const LEFT_MOUSE_BUTTON = {button: 0};

const getOptions = () => {
};

describe('Search', () => {
    describe('Test render', () => {

        test('Render control => Control exists ', () => {
            const searching = TestHelper.render(<Search loadOptions={getOptions}
                                                      dataId={dataId}/>);

            expect(searching.find('.search')).toBePresent();
            expect(searching.find('.is-searchable')).toBePresent();
            expect(searching.find('.search').prop('data-id')).toEqual(dataId);
        });
        test('When component is disabled=> options won`t show', () => {
            const searching = TestHelper.render(<Search loadOptions={getOptions}
                                                      dataId={dataId}
                                                      disabled/>);
            searching.find('.Select-control').simulate('mousedown', LEFT_MOUSE_BUTTON);

            expect(searching.find('.Select-menu-outer')).not.toBePresent();
        });
        test('Control default width => Control have width', () => {
            const controlWidth = "20%";
            const searching = TestHelper.render(<Search loadOptions={getOptions}
                                                      dataId={dataId}
                                                      width={controlWidth}/>);

            expect(searching.getDOMNode().style.width).toEqual(controlWidth);
        });
        test('Empty loadOptions elements => Component won`t render ', () => {
            const searching = TestHelper.render(<Search dataId={dataId}/>);

            expect(searching.getDOMNode()).toBeNull()
        });
        test('When have placeholder => Component render placeholder ', () => {
            const placeholder = 'placeholder';
            const searching = TestHelper.render(<Search loadOptions={getOptions}
                                                      dataId={dataId}
                                                      placeholder={placeholder}/>);

            setTimeout(() => {
                expect(searching.find('.Select-placeholder').text()).toEqual(placeholder);
            }, 1000);
        });
        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const searching = TestHelper.render(<Search loadOptions={getOptions} dataId={dataId} tabIndex={tabIndex}/>);

            expect(searching.getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Check renderOption', done => {
            const options = [
                {login: 'First value', id: '1'},
                {login: 'Second value', id: '2'},
                {login: 'Third value', id: '3'}
            ];

            const getInfo = () => Promise.resolve({options});


            const CustomOptionRender = option => (
                <div className="q1qqq">
                    <div>{option.login}</div>
                </div>
            );

            const searching = TestHelper.render(
                <Search loadOptions={getInfo}
                        dataId="select1"
                        optionRenderer={CustomOptionRender}
                        labelKey="login"
                />);

            expect(searching.find('.q1qqq')).not.toBePresent();

            searching.find('input').simulate('change', {target: {value: "value"}});

            setImmediate(() => {
                searching.update();
                const items = searching.find('.q1qqq');
                expect(items.length).toEqual(options.length);
                options.forEach((item, index) => {
                    expect(items.at(index).text()).toEqual(item.login)
                });
                done();
            })
        });

        test('Call closeMenu => options won`t show', done => {
            const options = [
                {login: 'First value', id: '1'},
            ];
            const getInfo = () => Promise.resolve({options});
            const CustomOptionRender = option => (
                <div className="q1qqq">
                    <div>{option.login}</div>
                </div>
            );
            const getCustomOption = () => {
                return [
                    <div>
                        <Link dataId="link-test"
                              onClick={() => {
                              }}>
                            Заполнить адрес вручную
                        </Link>
                    </div>
                ]
            };

            const searching = TestHelper.render(
                <Search loadOptions={getInfo}
                        dataId="select1"
                        optionRenderer={CustomOptionRender}
                        labelKey="login"
                        customOption={getCustomOption()}/>);
            const searchInstance = searching.instance();

            searching.find('input').simulate('change', {target: {value: "value"}});

            setImmediate(() => {
                searching.update();
                expect(searching.find(Link)).toBePresent();
                searchInstance.closeMenu();
                searching.update();
                expect(searching.find(Link)).not.toBePresent();
                done();
            })
        });
    });

});