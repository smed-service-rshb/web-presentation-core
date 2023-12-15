import menuBuilder from './menu-builder'

const disabledPage = {
    dataId: 'disabled-test-page',
    disabled: true,
    key: 'disabled-test-page-key',
};
const firstPage = {
    dataId: 'first-test-page',
    disabled: false,
    key: 'first-test-page-key',
};
const secondPage = {
    dataId: 'second-test-page',
    disabled: false,
    key: 'second-test-page-key',
};
const thirdPage = {
    dataId: 'third-test-page',
    disabled: false,
    key: 'third-test-page-key',
};

const externalPage = {
    dataId: 'external-test-page',
    disabled: false,
    key: 'external-test-page-key',
    href: 'www.google.ru',
};

const pageRelatedToFirstPageByKey = {
    dataId: 'test-page',
    disabled: false,
    key: 'test-page-key',
    related: [firstPage.key]
};

const pageRelatedToFirstPageByFunction = expectedPage => ({
    dataId: 'test-page',
    disabled: false,
    key: 'test-page-key',
    related: [page => {
        expect(page).toEqual(expectedPage);
        return page.key === firstPage.key;
    }],
});


const firstOtherModePage = {
    dataId: 'first-other-mode-test-page',
    disabled: false,
    mode: 'other-mode',
    key: 'first-other-mode-test-page-key',
};
const secondOtherModePage = {
    dataId: 'second-other-mode-test-page',
    disabled: false,
    mode: 'other-mode',
    key: 'second-other-mode-test-page-key',
};


const mockPageRouter = currentPage => ({
    currentPage: () => currentPage,
});

const event = {
    preventDefault: () => {
    },
};

const checkPage = (pageRouter, actual) => {
    const baseCheck = expected => {
        expect(actual).toBeDefined();
        expect(actual.dataId).toEqual(expected.dataId);
        expect(actual.disabled).toEqual(expected.disabled);
        expect(actual.mode).toEqual(expected.mode);
        expect(actual.onClick).toBeDefined();

        return {
            then: cb => cb(),
        }
    };

    const toBeNode = expected => baseCheck(expected).then(() => {
        expect(actual.page).not.toBeDefined();
        expect(actual.children).toBeDefined();

        pageRouter.open = jest.fn();
        actual.onClick(event);
        expected.disabled && expect(pageRouter.open).not.toBeCalled();
        const firstChild = actual.children[0];
        !expected.disabled && expect(pageRouter.open).toBeCalledWith(firstChild.key, firstChild.params);

        const result = {
            and: {
                active: () => {
                    expect(actual.active).toEqual(true);
                    return result;
                },
                notActive: () => {
                    expect(!!actual.active).toEqual(false);
                    return result;
                },
                children: cb => {
                    cb(actual.children);
                    return result;
                }
            }
        };
        return result;
    });

    const toBeLeaf = expected => baseCheck(expected).then(() => {
        expect(actual.page).toBeDefined();
        expect(actual.children).not.toBeDefined();

        pageRouter.open = jest.fn();
        pageRouter.openExternalPage = jest.fn();
        actual.onClick(event);

        if (expected.disabled) {
            expect(pageRouter.open).not.toBeCalled();
            expect(pageRouter.openExternalPage).not.toBeCalled();
        } else if (expected.href) {
            expect(pageRouter.openExternalPage).toBeCalledWith(expected.href);
            expect(pageRouter.open).not.toBeCalled();
        } else {
            expect(pageRouter.open).toBeCalledWith(expected.key, expected.params);
            expect(pageRouter.openExternalPage).not.toBeCalled();
        }

        return {
            and: {
                active: () => {
                    expect(actual.active).toEqual(true);
                },
                notActive: () => {
                    expect(!!actual.active).toEqual(false);
                },
            }
        };
    });

    return {
        toBeNode,
        toBeLeaf,
    };
};

const withRouter = pageRouter => {
    return {
        checkPage: actualPage => checkPage(pageRouter, actualPage),
    }
};

describe('menu-builder', () => {
    test('When empty data => empty result', () => {
        expect(menuBuilder([], mockPageRouter())).toEqual([]);
    });

    test('When single page (disabled) => empty result', () => {
        const pageRouter = mockPageRouter();
        const actualResult = menuBuilder([disabledPage], pageRouter);
        expect(actualResult.length).toEqual(0);
    });
    test('When single page (not current by page key) => not active single menu item', () => {
        const pageRouter = mockPageRouter(secondPage);
        const actualResult = menuBuilder([firstPage], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(firstPage).and.notActive();
    });
    test('When single page (not current by related page key) => not active single menu item', () => {
        const pageRouter = mockPageRouter(secondPage);
        const actualResult = menuBuilder([pageRelatedToFirstPageByKey], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(pageRelatedToFirstPageByKey).and.notActive();
    });
    test('When single page (not current by related function) => not active single menu item', () => {
        const page = pageRelatedToFirstPageByFunction(secondPage);
        const pageRouter = mockPageRouter(secondPage);
        const actualResult = menuBuilder([page], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(page).and.notActive();
    });
    test('When single page (current by page key) => active single menu item', () => {
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([firstPage], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(firstPage).and.active();
    });
    test('When single page (current by related page key) => active single menu item', () => {
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([pageRelatedToFirstPageByKey], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(pageRelatedToFirstPageByKey).and.active();
    });
    test('When single page (current by related function) => active single menu item', () => {
        const page = pageRelatedToFirstPageByFunction(firstPage);
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([page], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(page).and.active();
    });
    test('When single page (external) => active single menu item', () => {
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([externalPage], pageRouter);
        expect(actualResult.length).toEqual(1);
        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(externalPage).and.notActive();
    });

    test('When multi page (without children) data => multi menu item (without children)', () => {
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([disabledPage, firstPage, secondPage], pageRouter);
        expect(actualResult.length).toEqual(2);

        const [firstMenuItem, secondMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(firstPage).and.active();
        withRouter(pageRouter).checkPage(secondMenuItem).toBeLeaf(secondPage).and.notActive();
    });

    test('When multi page (with children) data => multi menu item (with children)', () => {
        const firstRootPage = {
            dataId: 'first-root-test-page',
            disabled: false,
            key: 'first-root-test-page-key',
            children: [secondPage, firstPage, disabledPage],
        };
        const secondRootPage = {
            dataId: 'root-test-page',
            disabled: false,
            key: 'root-test-page-key',
            children: [thirdPage],
        };
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([firstRootPage, secondRootPage], pageRouter);
        expect(actualResult.length).toEqual(2);

        const [firstMenuItem, secondMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeNode(firstRootPage)
            .and.active()
            .and.children(([firstMenuItem, secondMenuItem, disabledMenuItem]) => {
                withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(secondPage).and.notActive();
                withRouter(pageRouter).checkPage(secondMenuItem).toBeLeaf(firstPage).and.active();
                withRouter(pageRouter).checkPage(disabledMenuItem).toBeLeaf(disabledPage).and.notActive();
            }
        );

        withRouter(pageRouter).checkPage(secondMenuItem).toBeNode(secondRootPage)
            .and.notActive()
            .and.children(([firstMenuItem]) => {
                withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(thirdPage).and.notActive();
            }
        );
    });

    test('When multi page (with disabled children) data => single menu item (with children)', () => {
        const firstRootPage = {
            dataId: 'first-root-test-page',
            disabled: false,
            key: 'first-root-test-page-key',
            children: [secondPage, firstPage, thirdPage],
        };
        const secondRootPage = {
            dataId: 'root-test-page',
            disabled: true,
            key: 'root-test-page-key',
            children: [disabledPage],
        };
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([firstRootPage, secondRootPage], pageRouter);
        expect(actualResult.length).toEqual(1);

        const [firstMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeNode(firstRootPage)
            .and.active()
            .and.children(([firstMenuItem, secondMenuItem, thirdMenuItem]) => {
                withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(secondPage).and.notActive();
                withRouter(pageRouter).checkPage(secondMenuItem).toBeLeaf(firstPage).and.active();
                withRouter(pageRouter).checkPage(thirdMenuItem).toBeLeaf(thirdPage).and.notActive();
            }
        );
    });

    test('When multi page (with disabled active children) data => empty result', () => {
        const firstRootPage = {
            dataId: 'first-root-test-page',
            disabled: true,
            key: 'first-root-test-page-key',
            children: [disabledPage],
        };
        const pageRouter = mockPageRouter(disabledPage);
        const actualResult = menuBuilder([firstRootPage], pageRouter);
        expect(actualResult.length).toEqual(0);
    });

    test('When multi page (with different mode) data (current default mode) => only default mode menu item', () => {
        const pageRouter = mockPageRouter(firstPage);
        const actualResult = menuBuilder([firstOtherModePage, firstPage, secondOtherModePage, secondPage], pageRouter);
        expect(actualResult.length).toEqual(2);

        const [firstMenuItem, secondMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(firstPage).and.active();
        withRouter(pageRouter).checkPage(secondMenuItem).toBeLeaf(secondPage).and.notActive();
    });

    test('When multi page (with different mode) data (current specific mode) => default and specific mode menu item', () => {
        const pageRouter = mockPageRouter(firstOtherModePage);
        const actualResult = menuBuilder([firstOtherModePage, firstPage, secondOtherModePage, secondPage], pageRouter);
        expect(actualResult.length).toEqual(4);

        const [firstMenuItem, secondMenuItem, thirdMenuItem, fourthMenuItem] = actualResult;

        withRouter(pageRouter).checkPage(firstMenuItem).toBeLeaf(firstOtherModePage).and.active();
        withRouter(pageRouter).checkPage(secondMenuItem).toBeLeaf(firstPage).and.notActive();
        withRouter(pageRouter).checkPage(thirdMenuItem).toBeLeaf(secondOtherModePage).and.notActive();
        withRouter(pageRouter).checkPage(fourthMenuItem).toBeLeaf(secondPage).and.notActive();
    });
});
