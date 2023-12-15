import poaPageComponent from './POAForm'

import permissions from '../../../permissions'
import {POA_PAGE_KEY} from '../page-keys'

export const POAPage = {
    key: POA_PAGE_KEY,
    path: '/poa',
    component: poaPageComponent,

    availability: permissions.POA
};
