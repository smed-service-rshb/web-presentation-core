import React from 'react';

import {DEFAULT} from '../../layout/index'
import adaptPages from '../../page-router/array-to-pages-adapter'

import availabilityChecker from './availability-checker'
import mergeMenu from './menu-replicator'


const LOGIN_PAGE = {key: 'login'};// TODO пока гвоздями разобраться

const filterNulls = arr => (arr && arr.filter(Boolean));

const processNavigationTree = (pages, navigationTree) => menuItem => {

    const wrapMenuItem = (name, dataId) => {
        const real = menuItem(name, dataId);

        return {
            toPage(p) {
                const page = pages.find(page => page.key === p.key);
                if (!page) {
                    return null
                }
                //TODO related: ['entity-edit']
                return real.toPage(p)
            },
            withChildren(children) {
                const realChildren = filterNulls(children);
                if (realChildren && realChildren.length > 0) {
                    return real.withChildren(realChildren)
                }
                return null;
            },
            disabled(...args) {
                return real.disabled(...args);
            }
        }
    };
    return filterNulls(navigationTree(wrapMenuItem));
};

const availablePages = (pages, checkAvailability) => (
    pages.filter(page => checkAvailability(page.availability, page.moduleName))
);

const withLayout = (pages, menuData) => {
    const result = [];
    pages.forEach(page => {
        const Layout = page.component.CustomLayout || DEFAULT;
        const component = props => <Layout menuData={menuData}>
            <page.component {...props}/>
        </Layout>;
        result.push({
            ...page,
            component,
        })
    });
    return result;
};

const getFirstOrDefault = (array, defaultValue) => (array && array.length > 0 ? array[0] : defaultValue);
const format = item => ({dataId: item.key, ...item, children: item.children && item.children.map(format)});

export default (pages, authContext, navigationTree) => {
    if (!authContext || !pages) {
        return adaptPages([])
    }
    const checkAvailability = availabilityChecker(authContext);

    const aPages = availablePages(pages, checkAvailability);
    const processedNavigationTree = processNavigationTree(aPages, navigationTree);

    const flatMenuPages = processedNavigationTree(() => ({
        toPage: page => page,
        withChildren: children => children[0],
        disabled: () => undefined,
    }));

    const menuData = processedNavigationTree((name, dataId) => ({
        toPage: page => ({...page, name, dataId}),
        withChildren: children => ({name, dataId, children}),
        disabled: options => ({...options, name, dataId, disabled: true}),
    }));

    const externalMenu = authContext.menu || [];

    const indexPage = getFirstOrDefault(flatMenuPages, getFirstOrDefault(externalMenu, LOGIN_PAGE));

    return adaptPages(withLayout(aPages, mergeMenu(menuData, externalMenu.map(format))), indexPage);
}
//TODO переписать и покрыть тестами pages-processor.js