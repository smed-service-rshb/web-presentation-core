import EntityEdit from './EntityEdit'
import permissions from '../../../permissions'
import {EDIT_PAGE_KEY, CREATE_PAGE_KEY} from '../page-keys'

export const EntityEditPage = {
    key: EDIT_PAGE_KEY,
    path: '/entities/edit/:id',
    component: EntityEdit,

    availability: authContext => authContext.checkPermission(permissions.VIEW) || authContext.checkPermission(permissions.EDIT),
};

export const EntityCreatePage = {
    key: CREATE_PAGE_KEY,
    path: '/entities',
    component: EntityEdit,

    availability: authContext => authContext.checkPermission(permissions.VIEW) || authContext.checkPermission(permissions.EDIT),
};