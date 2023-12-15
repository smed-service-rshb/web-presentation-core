import SharedPopupComponent from './SharedPopupComponent';
import PrivatePopupComponent from './PrivatePopupComponent';
import {SHARED_MODAL, PRIVATE_MODAL} from './keys';

export const SharedPopup = {
    key: SHARED_MODAL,
    component: SharedPopupComponent,
};

export const PrivatePopup = {
    key: PRIVATE_MODAL,
    component: PrivatePopupComponent,
};
