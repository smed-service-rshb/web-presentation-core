import {EntitiesListPage} from './entities-list'
import {EntityEditPage, EntityCreatePage} from './entity-edit'
import {EntityViewPage} from './entity-view'

import {PaymentEditStep1Page, PaymentEditStep2Page, PaymentEditStep3Page} from './payment-edit'

import {PaymentsListPage} from './payments-list'
import {
    ClientFormPage,
    ClientAccountProductFormPage,
    ClientCardProductFormPage,
    ClientProductListFormPage,
    FindClientFormPage,
    NewClientEditDataFormPage,
} from './client-form';

import {TasksListPage} from './tasks';
import {LongRequestPage} from './request'

import {Page1_1Page, Page1_2Page, Page2_1_1Page, Page2_1_2Page, Page2_2_1Page} from './tree'

import {
    UseRelatedActionPage,
    UseRelatedPagePage,
    UseRelatedPopupPage,
} from './related';

import {
    NewTabPage
} from './newTab'

import {
    POAPage
} from './poa'

export const Pages = {
    EntitiesListPage,
    EntityEditPage,
    EntityViewPage,
    EntityCreatePage,

    ClientFormPage,
    ClientAccountProductFormPage,
    ClientCardProductFormPage,
    ClientProductListFormPage,
    FindClientFormPage,
    NewClientEditDataFormPage,

    PaymentEditStep1Page,
    PaymentEditStep2Page,
    PaymentEditStep3Page,
    PaymentsListPage,

    TasksListPage,

    LongRequestPage,

    Page1_1Page,
    Page1_2Page,
    Page2_1_1Page,
    Page2_1_2Page,
    Page2_2_1Page,

    UseRelatedActionPage,
    UseRelatedPagePage,
    UseRelatedPopupPage,

    NewTabPage,

    POAPage,
};

export * as PageKeys from './page-keys'