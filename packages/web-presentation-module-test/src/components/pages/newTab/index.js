import NewTab from './NewTab'
import permissions from '../../../permissions'
import {NEW_TAB_PAGE_KEY} from '../page-keys'

export const NewTabPage = {
    key: NEW_TAB_PAGE_KEY,
    path: '/new-tab',
    component: NewTab,

    availability: permissions.NEW_TAB,
};