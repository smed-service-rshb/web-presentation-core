import permissions from "../permissions";

import SharedPageComponent from "./SharedPageComponent";
import PrivatePageComponent from "./PrivatePageComponent";
import {SHARED_PAGE, PRIVATE_PAGE} from './keys';


export const SharedPage = {
    key: SHARED_PAGE,
    path: '/provider-test-module/shared-page',
    component: SharedPageComponent,
    availability: permissions.USE_SHARED_PAGE,
};

export const PrivatePage = {
    key: PRIVATE_PAGE,
    path: '/provider-test-module/private-page',
    component: PrivatePageComponent,
    availability: permissions.USE_PRIVATE_PAGE,
};
