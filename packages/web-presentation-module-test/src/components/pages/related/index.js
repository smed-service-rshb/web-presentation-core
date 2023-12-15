import permissions from "../../../permissions";
import {
    USE_RELATED_ACTION_PAGE_KEY,
    USE_RELATED_POPUP_PAGE_KEY,
    USE_RELATED_PAGE_PAGE_KEY,
} from "../page-keys";
import UseActionComponent from "./UseActionComponent";
import UsePageComponent from "./UsePageComponent";
import UsePopupComponent from "./UsePopupComponent";


export const UseRelatedActionPage = {
    key: USE_RELATED_ACTION_PAGE_KEY,
    path: '/related/action',
    component: UseActionComponent,

    availability: permissions.USE_RELATED_ACTION,
};

export const UseRelatedPagePage = {
    key: USE_RELATED_PAGE_PAGE_KEY,
    path: '/related/page',
    component: UsePageComponent,

    availability: permissions.USE_RELATED_PAGE,
};

export const UseRelatedPopupPage = {
    key: USE_RELATED_POPUP_PAGE_KEY,
    path: '/related/popup',
    component: UsePopupComponent,

    availability: permissions.USE_RELATED_POPUP,
};
