import * as ModalKeys from './modals-keys'

import AlertComponent from './Alert'
import ConfirmComponent from './Confirm'


export const Alert = {
    key: ModalKeys.ALERT_MODAL_KEY,
    component: AlertComponent,
};

export const Confirm = {
    key: ModalKeys.CONFIRM_MODAL_KEY,
    component: ConfirmComponent,
};

export {ModalKeys}
