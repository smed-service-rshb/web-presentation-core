import EntityView from './EntityView'
import permissions from '../../../permissions'
import {VIEW_PAGE_KEY} from '../page-keys'

export const EntityViewPage = {
    key: VIEW_PAGE_KEY,
    path: '/entities/view/:id',
    component: EntityView,

    availability: permissions.VIEW,
};