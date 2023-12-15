import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import createHistory from 'history/createMemoryHistory'

import testPropTypes from '../prop-types-for-test'

import PageRouter from './PageRouter'
import withPageRouter from './withPageRouter'

import adaptPages from './array-to-pages-adapter'

import MockPageRouter from './MockPageRouter'

const PageComponent = () => (<div>PageComponent</div>);
PageComponent.propTypes = testPropTypes;

const withPageRouterPage =
    {
        key: 'with-page-router',
        path: '/with-page-router',
        component: withPageRouter(PageComponent)
    };

const simplePage =
    {
        key: 'simple-page',
        path: '/simple-page',
        component: PageComponent
    };

describe('withPageRouter', () => {
    let history;

    beforeEach(() => {
        history = createHistory()
    });

    test('Render', () => {
        expect(() => {
            TestHelper.render(<PageRouter pages={adaptPages([withPageRouterPage, simplePage])} history={history}/>);
        }).not.toThrowError();
    });

    test('When component wrapped withPageRouter => pageRouter passes to props', () => {
        history.push(withPageRouterPage.path);
        let router = TestHelper.render(<PageRouter pages={adaptPages([withPageRouterPage])} history={history}/>);

        const pageComponent = router.find(PageComponent);
        expect(pageComponent.exists()).toEqual(true);

        expect(pageComponent.props().pageRouter).toBeDefined()
    });

    test('When component not wrapped withPageRouter => pageRouter not passes to props', () => {
        history.push(simplePage.path);
        let router = TestHelper.render(<PageRouter pages={adaptPages([simplePage])} history={history}/>);

        const pageComponent = router.find(PageComponent);
        expect(pageComponent.exists()).toEqual(true);

        expect(pageComponent.props().pageRouter).not.toBeDefined()
    });

    test('Wrapped component propTypes contains original propTypes', () => {
        history.push(withPageRouterPage.path);
        let router = TestHelper.render(<PageRouter pages={adaptPages([withPageRouterPage])} history={history}/>);

        const pageComponent = router.find(withPageRouterPage.component);
        expect(pageComponent.exists()).toEqual(true);

        expect(pageComponent.type().propTypes).toEqual(expect.objectContaining(PageComponent.propTypes))
    });

    test('Test props passed to wrapped component', () => {
        const Component = withPageRouter(PageComponent);
        const props = {
            optionalString: "sdfsdf",
            optionalNumber: 123123
        };

        const pageRouter = MockPageRouter.createPageRouter();
        let component = TestHelper.render(<MockPageRouter pageRouter={pageRouter}><Component {...props}/></MockPageRouter>);

        const wrappedComponent = component.find(PageComponent);
        expect(wrappedComponent.exists()).toEqual(true);

        expect(wrappedComponent.props()).toEqual({...props, pageRouter})
    });
});
