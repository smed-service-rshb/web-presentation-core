import {compose} from "@efr/medservice-web-presentation-core";

import * as Actions from './actions';
import * as Pages from './pages';
import * as Popups from './popups';

const moduleName = 'provider-test-module';

const moduleDefinition = arg => {
    const {name, action, modal, page} = arg;

    name(moduleName);

    Object.keys(Actions).forEach(actionDescription => {
        action(Actions[actionDescription]);
    });

    Object.keys(Pages).forEach(pageDescription => {
        page(Pages[pageDescription]);
    });

    Object.keys(Popups).forEach(popupDescription => {
        modal(Popups[popupDescription]);
    });

    return arg;
};

export default compose(
    moduleDefinition,
);

export {moduleName}
export permissions from './permissions';
