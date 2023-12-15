import ClientFormComponent from './ViewClientForm'
import FindClientForm from './FindClientForm'
import ViewProductForm from './ViewProductForm'
import NewClientEditDataForm from './NewClientEditDataForm';
import ClientProductListForm from './ClientProductListForm'

import permissions from '../../../permissions'

import {
    CLIENT_FORM_PAGE_KEY,
    FIND_CLIENT_FORM_PAGE_KEY,
    CLIENT_ACCOUNT_PRODUCT_FORM_PAGE_KEY,
    CLIENT_CARD_PRODUCT_FORM_PAGE_KEY,
    CLIENT_PRODUCT_LIST_FORM_PAGE_KEY,
    NEW_CLIENT_FORM_PAGE_KEY,
} from '../page-keys'

export const FindClientFormPage = {
    key: FIND_CLIENT_FORM_PAGE_KEY,
    path: '/clients/find',
    component: FindClientForm,

    availability: permissions.FIND_CLIENT_FORM
};

export const ClientFormPage = {
    key: CLIENT_FORM_PAGE_KEY,
    path: '/clients/:systemId/:clientId/show',
    component: ClientFormComponent,

    availability: permissions.SHOW_CLIENT_FORM
};

export const NewClientEditDataFormPage = {
    key: NEW_CLIENT_FORM_PAGE_KEY,
    path: '/clients/new',
    component: NewClientEditDataForm,

    availability: permissions.NEW_CLIENT_FORM
};

export const ClientProductListFormPage = {
    key: CLIENT_PRODUCT_LIST_FORM_PAGE_KEY,
    path: '/clients/:systemId/:clientId/products',
    component: ClientProductListForm,

    availability: permissions.CLIENT_PRODUCT_LIST_FORM
};

export const ClientAccountProductFormPage = {
    key: CLIENT_ACCOUNT_PRODUCT_FORM_PAGE_KEY,
    path: '/clients/:systemId/:clientId/products/account/:productId',
    component: ViewProductForm('счет'),

    availability: permissions.CLIENT_ACCOUNT_PRODUCT_FORM
};

export const ClientCardProductFormPage = {
    key: CLIENT_CARD_PRODUCT_FORM_PAGE_KEY,
    path: '/clients/:systemId/:clientId/products/card/:productId',
    component: ViewProductForm('карта'),

    availability: permissions.CLIENT_CARD_PRODUCT_FORM
};
