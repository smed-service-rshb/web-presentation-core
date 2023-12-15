import LongRequestComponent from './LongRequest'
import permissions from '../../../permissions'
import {LONG_REQUEST_PAGE_KEY} from '../page-keys'

export const LongRequestPage = {
    key: LONG_REQUEST_PAGE_KEY,
    path: '/long-request',
    component: LongRequestComponent,

    availability: permissions.LONG_REQUEST,
};