import PaymentsListComponent from './PaymentsList'

import {PAYMENTS_LIST_PAGE_KEY} from '../page-keys'

export const PaymentsListPage = {
    key: PAYMENTS_LIST_PAGE_KEY,
    path: '/payments/list',
    component: PaymentsListComponent,

    availability: personContext => personContext.authenticated,
};