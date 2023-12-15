import EntitiesList from './EntitiesList'

import permissions from '../../../permissions'
import {LIST_PAGE_KEY} from '../page-keys'

export const EntitiesListPage = {
    key: LIST_PAGE_KEY,
    path: '/entities/list',
    component: EntitiesList,

    availability: permissions.LIST,
};