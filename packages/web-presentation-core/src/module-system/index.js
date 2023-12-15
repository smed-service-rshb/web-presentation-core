import {Alert, Confirm} from './modals'

export default ({name, modal}) => {
    name('system');

    modal(Alert);
    modal(Confirm);
}