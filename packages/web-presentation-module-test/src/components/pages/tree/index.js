import createPageComponent from './TreePage'

import permissions from '../../../permissions'
import * as PageKeys from '../page-keys'

export const Page1_1Page = {
    key: PageKeys.PAGE_1_1,
    path: '/page1/1',
    component: () => createPageComponent('1.1'),

    availability: permissions.TREE_PAGE_1_1
};

export const Page1_2Page = {
    key: PageKeys.PAGE_1_2,
    path: '/page1/2',
    component: () => createPageComponent('1.2'),

    availability: permissions.TREE_PAGE_1_2
};

export const Page2_1_1Page = {
    key: PageKeys.PAGE_2_1_1,
    path: '/page2/1/1',
    component: () => createPageComponent('2.1.1'),

    availability: permissions.TREE_PAGE_2_1_1
};

export const Page2_1_2Page = {
    key: PageKeys.PAGE_2_1_2,
    path: '/page2/1/2',
    component: () => createPageComponent('2.1.2'),

    availability: permissions.TREE_PAGE_2_1_2
};

export const Page2_2_1Page = {
    key: PageKeys.PAGE_2_2_1,
    path: '/page2/2/1',
    component: () => createPageComponent('2.2.1'),

    availability: permissions.TREE_PAGE_2_2_1
};

