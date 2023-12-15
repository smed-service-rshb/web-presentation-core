import PaymentEditStep1Component from './PaymentEditStep1'
import PaymentEditStep2Component from './PaymentEditStep2'
import PaymentEditStep3Component from './PaymentEditStep3'

import permissions from '../../../permissions'
import {PAYMENT_EDIT_STEP1_PAGE_KEY, PAYMENT_EDIT_STEP2_PAGE_KEY, PAYMENT_EDIT_STEP3_PAGE_KEY} from '../page-keys'

export const PaymentEditStep1Page = {
    key: PAYMENT_EDIT_STEP1_PAGE_KEY,
    path: '/payment/edit/step1',
    component: PaymentEditStep1Component,

    availability: permissions.INTERNAL_TRANSFER
};

export const PaymentEditStep2Page = {
    key: PAYMENT_EDIT_STEP2_PAGE_KEY,
    path: '/payment/edit/step2',
    component: PaymentEditStep2Component,

    availability: permissions.CREATE_PAYMENT
};

export const PaymentEditStep3Page = {
    key: PAYMENT_EDIT_STEP3_PAGE_KEY,
    path: '/payment/edit/step3',
    component: PaymentEditStep3Component,

    availability: permissions.CREATE_PAYMENT
};
