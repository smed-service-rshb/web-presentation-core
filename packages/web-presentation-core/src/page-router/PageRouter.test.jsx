import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import createHistory from 'history/createMemoryHistory'

import PageRouter from './PageRouter'
import withPageRouter from './withPageRouter'
import URLUtil from './URLUtil'
import adaptPages from './array-to-pages-adapter'

class TestComponent extends React.Component {
    render() {
        return <div>clients-list</div>
    }
}

const pages = [
    {
        key: 'clients-list',
        path: '/clients/list',
        component: TestComponent
    },
    {
        key: 'clients-edit',
        path: '/clients/edit/:id',
        component: () => <div>clients-edit</div>,
        paramTypes: {
            id: {
                parse: value => parseInt(value, 10),
                format: value => value
            }
        },
        testParams: {id: 123}
    },
    {
        key: 'with-page-router',
        path: '/with-page-router',
        component: withPageRouter(TestComponent)
    },
];

const adaptedPages = adaptPages(pages);

const expectNotFoundPage = router => {
    expect(router.text()).toEqual("Страница не найдена.");
};

const expectPage = (location, router, page, params, url) => {
    router.update();
    const pageComponent = router.find(page.component);
    expect(pageComponent.exists()).toEqual(true);
    expect(pageComponent.props()).toEqual(params||{});
    expect(location.pathname + location.search).toEqual(url || URLUtil.buildUrl(page.path, params||{}, page.paramTypes));
};

const expectNewTabPage = (originalUrl, location, router, page, opened) => {
    if (opened) {
        const pageComponent = router.find(page.component);

        expect(pageComponent.exists()).toEqual(false);
        expect(global.open).toBeCalled()
    }
    else {
        expect(global.open).not.toBeCalled();
    }
    expect(originalUrl).toEqual(location.pathname + location.search);
};

describe('PageRouter', () => {
    let history;

    beforeEach(() => {
        history = createHistory();
        global.open = jest.fn();
    });

    describe('Render', () => {
        test('When test-app with pages => success', () => {
            expect(() => {
                TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            }).not.toThrowError();
        });

        test('When test-app without pages => success', () => {
            expect(() => {
                TestHelper.render(<PageRouter history={history}/>);
            }).not.toThrowError();
        });

        test('When test-app without history => Error thrown', () => {
            expect(() => {
                TestHelper.render(<PageRouter/>);
            }).toThrowError();
        });
    });

    describe('PageRouter location test', () => {
        test('When URL does not match any page and indexPage undefined => Page not found expected', () => {
            history.push('/asdfasdfsadf/asdfgasfasd/fas/fasdf?sadfasdf/asdf');

            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            expectNotFoundPage(router)
        });

        test('When URL does not match any page and indexPage defined => indexPage must rendered', () => {
            pages.forEach(indexPage => {
                history.push('/asdfasdfsadf/asdfgasfasd/fas/fasdf?sadfasdf/asdf');

                const router = TestHelper.render(
                    <PageRouter history={history} pages={adaptPages(pages, {
                        key: indexPage.key,
                        params: indexPage.testParams
                    })}/>);

                expectPage(history.location, router, indexPage, indexPage.testParams,);

                router.unmount()
            });
        });

        test('When URL does not match any page and indexPage defined 2=> indexPage must rendered', () => {
            pages.forEach(indexPage => {
                const router = TestHelper.render(
                    <PageRouter history={history} pages={adaptPages(pages, {
                        key: indexPage.key,
                        params: indexPage.testParams
                    })}/>);
                history.push('/asdfasdfsadf/asdfgasfasd/fas/fasdf?sadfasdf/asdf');
                expectPage(history.location, router, indexPage, indexPage.testParams);

                router.unmount()
            });
        });


        test('When URL does not match any page and unknown indexPage defined => Page not found expected', () => {
            history.push('/asdfasdfsadf/asdfgasfasd/fas/fasdf?sadfasdf/asdf');

            const router = TestHelper.render(<PageRouter history={history} indexPage={{key: 'some-key'}}/>);

            expectNotFoundPage(router)
        });

        test('When URL matched page without template params => the page must rendered', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };

            history.push(page.path);

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            expectPage(history.location, router, page)
        });

        test('When URL part matched page without template params => Page not found expected', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            [
                '/',
                '/clients/',
                '/clients/lis',
                '/clients/list/asd',
                '/clients/list/asd/',
                '/clients/list/',
                '/list/',
                '/list',
                '/list/clients/',
                '/list/clients'
            ].forEach(wrongLocation => {
                history.push(wrongLocation);
                expectNotFoundPage(router);
            })
        });

        test('When URL with queryString matched page without template params => Page not found expected', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            const url = page.path + '?sdgfsdagf=sdagsadg&sdfsadf/sdfsdf/';
            history.push(url);

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            expectPage(history.location, router, page, {}, url)
        });

        test('When URL matched page with template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/edit/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    }
                },
            };

            const id = 12323;
            history.push(`/clients/edit/${id}`);

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            expectPage(history.location, router, page, {id})
        });

        test('When URL part matched page with template params => Page not found expected', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
            };

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            [
                '/',
                '/clients',
                '/clients/',
                '/clients/123123/',
                '/clients/123123/dfgdfgdfg',
            ].forEach(wrongLocation => {
                history.push(wrongLocation);
                expectNotFoundPage(router);
            });
        });

        test('When URL with incorrect queryString matched page with template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    }
                },
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const id = 12323;
            const url = `/clients/${id}?id=sdagsadg&sdfsadf/sdfsdf/&sadfsadf=asdf/sadf`;
            history.push(url);

            expectPage(history.location, router, page, {id}, url)
        });

        test('When URL with incorrect queryString matched page without template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients',
                component: () => <div>clients-edit</div>,
                paramTypes: {},
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const url = `/clients?id=sdagsadg&sdfsadf/sdfsdf/&sadfsadf=asdf/sadf`;
            history.push(url);

            expectPage(history.location, router, page, {}, url)
        });

        test('When URL with queryString matched page without template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    },
                },
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const id = 12323;
            history.push(`/clients?id=${id}`);

            expectPage(history.location, router, page, {id})
        });

        test('When URL with queryString matched page with template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    },
                    queryParam: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    }
                },
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const id = 12323;
            const queryParam = 100;
            history.push(`/clients/${id}?queryParam=${queryParam}`);

            expectPage(history.location, router, page, {id, queryParam})
        });

        test('When URL with redundant queryString matched page with template params => the page must rendered', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    },
                    queryParam: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    }
                },
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const id = 12323;
            const queryParam = 100;
            const url = `/clients/${id}?queryParam=${queryParam}%ааа=123`;
            history.push(url);

            expectPage(history.location, router, page, {id, queryParam}, url)
        });

        test('When URL contains param in path and queryString => path param must be used', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    },
                },
            };
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            const id = 12323;
            const url = `/clients/${id}?id=100`;
            history.push(url);

            expectPage(history.location, router, page, {id}, url);
        });

        test('When component wrapped with withPageRouter => the page must rendered', () => {
            const page = {
                key: 'with-page-router',
                path: '/with-page-router',
                component: withPageRouter(TestComponent)
            };

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);
            history.push(page.path);

            expectPage(history.location, router, page)
        });
    });

    describe('PageRouter actions', () => {
        test('When openPage exist page => page opened and true returned', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            pages.forEach(page => {
                const result = pageRouter.open(page.key, page.testParams);
                expect(result).toEqual(true);

                expectPage(history.location, router, page, page.testParams)
            })
        });

        test('When open wrong page => prev page expected and false returned', () => {
            const prevPage = pages[2];
            history.push(prevPage.path);
            const router = TestHelper.render(<PageRouter pages={adaptPages([prevPage])} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            const result = pageRouter.open('some-wrong-Page-key-sdfgsd45646fg678=fg-hh0gsdgdfg');

            expect(result).toEqual(false);
            expectPage(history.location, router, prevPage, prevPage.testParams)
        });

        test('When open valid index page => page opened and true returned', () => {
            pages.forEach(indexPage => {
                const router = TestHelper.render(
                    <PageRouter pages={adaptPages(pages, {
                        key: indexPage.key,
                        params: indexPage.testParams
                    })} history={history}/>
                );
                const pageRouter = router.instance().getChildContext().pageRouter;
                const result = pageRouter.openIndex();

                expect(result).toEqual(true);
                expectPage(history.location, router, indexPage, indexPage.testParams)
            });
        });

        test('When open indexPage without specify => prev page expected and false returned', () => {
            const prevPage = pages[2];
            history.push(prevPage.path);
            const router = TestHelper.render(<PageRouter pages={adaptPages([prevPage])} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            const result = pageRouter.openIndex();

            expect(result).toEqual(false);
            expectPage(history.location, router, prevPage, prevPage.testParams)
        });

        test('When openPageNewTab exist page => page opened and true returned', () => {
            const originalUrl = history.location.pathname + history.location.search;
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            pages.forEach(page => {
                global.open = jest.fn();
                const result = pageRouter.openNewTab(page.key, page.testParams);
                expect(result).toEqual(true);

                expectNewTabPage(originalUrl, history.location, router, page, true);
            })
        });

        test('When openPageNewTab exist page with name => page opened and true returned', () => {
            const originalUrl = history.location.pathname + history.location.search;
            const keyPage = "keyPage";
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            pages.forEach(page => {
                const result = pageRouter.openNewTab(page.key, page.testParams, keyPage);
                expect(result).toEqual(true);

                expectNewTabPage(originalUrl, history.location, router, page, true);
            })
        });

        test('When openPageNewTab wrong page => page false returned', () => {
            const originalUrl = history.location.pathname + history.location.search;
            const page = {
                path: "some-wrong-Page-key-sdfgsd45646fg678=fg-hh0gsdgdfg",
                testParams: {},
            };
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;
            global.open = jest.fn();
            const result = pageRouter.open(page.path);

            expect(result).toEqual(false);
            expectNewTabPage(originalUrl, history.location, router, page, false);
        });


        test('When back on start page => prevLocation expected', () => {
            const prevLocation = history.location;
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;

            pageRouter.back();

            expect(history.location).toEqual(prevLocation);
        });

        test('When back on start page => prevLocation expected', () => {
            const prevLocation = history.location;
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;

            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }

            for (let i = pages.length - 1; i >= 0; i--) {
                expectPage(history.location, router, pages[i], pages[i].testParams);
                pageRouter.back();
            }

            expect(history.location).toEqual(prevLocation);
        });

        test('When currentPage on unknown page => null expected', () => {
            const router = TestHelper.render(<PageRouter history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;

            const currentPage = pageRouter.currentPage();

            expect(currentPage).toBeNull();
        });

        test('When currentPage on correct page without params => this page expected', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };

            history.push(page.path);

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            expectPage(history.location, router, page);

            const pageRouter = router.instance().getChildContext().pageRouter;
            const currentPage = pageRouter.currentPage();

            expect(currentPage).toEqual({key: page.key});
        });

        test('When currentPage on correct page with params => this page expected', () => {
            const page = {
                key: 'clients-edit',
                path: '/clients/:id',
                component: () => <div>clients-edit</div>,
                paramTypes: {
                    id: {
                        parse: value => parseInt(value, 10),
                        format: value => value
                    }
                },
            };

            const testParams = {id: 123};

            history.push(`/clients/${testParams.id}`);
            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);

            expectPage(history.location, router, page, testParams);

            const pageRouter = router.instance().getChildContext().pageRouter;
            const currentPage = pageRouter.currentPage();

            expect(currentPage).toEqual({key: page.key, params: testParams});
        });

        test('Test currentPage after open pages', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);

            const pageRouter = router.instance().getChildContext().pageRouter;

            pages.forEach(page => {
                const result = pageRouter.open(page.key, page.testParams);
                expect(result).toEqual(true);

                const currentPage = pageRouter.currentPage();

                expect(currentPage).toEqual({key: page.key, params: page.testParams});
            });
        });

        test('Test currentPage after open index page', () => {
            const [, indexPage, prevPage] = pages;

            history.push(prevPage.path);

            const router = TestHelper.render(
                <PageRouter history={history} pages={adaptPages(pages, {
                    key: indexPage.key,
                    params: indexPage.testParams
                })}/>);

            expectPage(history.location, router, prevPage, prevPage.testParams);

            const pageRouter = router.instance().getChildContext().pageRouter;

            const result = pageRouter.openIndex();
            expect(result).toEqual(true);

            const currentPage = pageRouter.currentPage();

            expect(currentPage).toEqual({key: indexPage.key, params: indexPage.testParams});
        });

        test('Test currentPage after back', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;

            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }

            for (let i = pages.length - 1; i >= 0; i--) {
                const currentPage = pageRouter.currentPage();
                expect(currentPage).toEqual({key: pages[i].key, params: pages[i].testParams});

                history.goBack();
            }

            const currentPage = pageRouter.currentPage();
            expect(currentPage).toBeNull();
        });
    });

    describe('Change props', () => {
        test('When pages props becomes empty => page not found expected ', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            history.push(page.path);
            const prevLocation = history.location;

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);
            expectPage(history.location, router, page);

            router.setProps({pages: undefined});

            expectNotFoundPage(router);
            expect(history.location).toEqual(prevLocation);
        });

        test.skip('When page gone and index present => index page expected ', () => {
            const page1 = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            const page2 = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };
            history.push(page1.path);

            const router = TestHelper.render(<PageRouter pages={adaptPages([page1])} history={history}/>);
            expectPage(history.location, router, page1);

            router.setProps({pages: adaptPages([page2], {key: page2.key})});

            expectPage(history.location, router, page2);
        });


        test('When props changed without current page => page not found expected ', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            history.push(page.path);
            const prevLocation = history.location;

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);
            expectPage(history.location, router, page);

            const newPage = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };

            router.setProps({pages: adaptPages([newPage])});

            expectNotFoundPage(router);
            expect(history.location).toEqual(prevLocation);
        });

        test('When props changed with current page => current page expected', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            history.push(page.path);
            const prevLocation = history.location;

            const router = TestHelper.render(<PageRouter pages={adaptPages([page])} history={history}/>);
            expectPage(history.location, router, page);

            const newPage = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };

            router.setProps({pages: adaptPages([newPage, page])});

            expectPage(history.location, router, page);
            expect(history.location).toEqual(prevLocation);
        });

        test('When props changed with current page 2 => current page expected', () => {
            const page = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            history.push(page.path);
            const prevLocation = history.location;

            const router = TestHelper.render(<PageRouter history={history}/>);
            expectNotFoundPage(router);

            router.setProps({pages: adaptPages([page])});

            expectPage(history.location, router, page);
            expect(history.location).toEqual(prevLocation);
        });

        test('When props changed with current page and index => current page expected', () => {
            const page1 = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            const page2 = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };

            history.push(page1.path);
            const prevLocation = history.location;

            const router = TestHelper.render(<PageRouter history={history}/>);
            expectNotFoundPage(router);

            router.setProps({pages: adaptPages([page1, page2]), indexPage: {key: page2.key}});

            expectPage(history.location, router, page1);
            expect(history.location).toEqual(prevLocation);
        });

        test.skip('When props changed without current page and with index => index page expected', () => {
            const page1 = {
                key: 'clients-list',
                path: '/clients/list',
                component: TestComponent
            };
            const page2 = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };

            const router = TestHelper.render(<PageRouter history={history}/>);
            expectNotFoundPage(router);

            router.setProps({pages: adaptPages([page1, page2], {key: page2.key})});

            expectPage(history.location, router, page2);
        });

        test('login simulation', () => {
            const loginPage = {
                key: 'login',
                path: '/login',
                component: TestComponent
            };

            const router = TestHelper.render(<PageRouter pages={adaptPages([loginPage], {key: loginPage.key})}
                                                         history={history}/>);
            history.push(loginPage.path);
            expectPage(history.location, router, loginPage);

            const newPage = {
                key: 'clients-edit',
                path: '/clients/edit',
                component: TestComponent
            };

            router.setProps({pages: adaptPages([loginPage, newPage], {key: newPage.key})});
            expectPage(history.location, router, loginPage);

            const pageRouter = router.instance().getChildContext().pageRouter;
            const result = pageRouter.openIndex();
            expect(result).toEqual(true);

            expectPage(history.location, router, newPage);
        });

        test('When back on mark page => mark Location expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            pageRouter.markPage("testLabel");
            const prevLocation = history.location;
            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }
            pageRouter.back("testLabel");

            expect(history.location).toEqual(prevLocation);
        });

        test('When back on mark page when 2 equal mark => latest mark Location expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            pageRouter.markPage("testLabel");
            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }
            pageRouter.markPage("testLabel");
            const prevLocation = history.location;
            pageRouter.open(pages[0].key, pages[0].testParams);
            pageRouter.back("testLabel");

            expect(history.location).toEqual(prevLocation);
        });

        test('When back on mark prev page => mark Location expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            const prevLocation = history.location;
            pageRouter.open(pages[0].key, pages[0].testParams);

            pageRouter.markPrevPage("testLabel");
            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }
            pageRouter.back("testLabel");

            expect(history.location).toEqual(prevLocation);
        });

        test('When back on mark prev page when 2 equal mark=> latest mark mark Location expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            pageRouter.open(pages[0].key, pages[0].testParams);
            pageRouter.markPrevPage("testLabel");
            for (let i = 0; i < pages.length; i++) {
                pageRouter.open(pages[i].key, pages[i].testParams);
            }
            const prevLocation = history.location;
            pageRouter.open(pages[0].key, pages[0].testParams);
            pageRouter.markPrevPage("testLabel");
            pageRouter.back("testLabel");

            expect(history.location).toEqual(prevLocation);
        });

        test('When back on incorrect mark without callback => nothing expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            pageRouter.open(pages[0].key, pages[0].testParams);
            const prevLocation = history.location;
            pageRouter.back("testLabel");
            const afterLocation = history.location;

            expect(afterLocation).toEqual(prevLocation);
        });

        test('When back on incorrect mark with callback => nothing expected', () => {
            const router = TestHelper.render(<PageRouter pages={adaptedPages} history={history}/>);
            const pageRouter = router.instance().getChildContext().pageRouter;
            pageRouter.open(pages[0].key, pages[0].testParams);
            const prevLocation = history.location;
            const cb = jest.fn();
            pageRouter.back("testLabel", cb);
            const afterLocation = history.location;

            expect(afterLocation).toEqual(prevLocation);
            expect(cb).toBeCalled();
        });

    });
});
//TODO покрыть тестами onChangedPage