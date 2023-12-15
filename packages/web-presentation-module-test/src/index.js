import {Pages, Popups} from './components';
import * as Actions from './actions'
import {compose} from "@efr/medservice-web-presentation-core";

const moduleName = 'entities';

const moduleDefinition = args => {
    const {name, action, page, modal} = args;

    name(moduleName);

    Object.keys(Pages).forEach(pageDescription => {
        page(Pages[pageDescription]);
    });

    Object.keys(Popups).forEach(modalDescription => {
        modal(Popups[modalDescription]);
    });

    Object.keys(Actions).forEach(actionDescription => {
        action(Actions[actionDescription]);
    });

    //TODO widget(новости)

    return args;
};

export default compose(
    moduleDefinition,
);

export {moduleName}

export Permissions from './permissions'

export {PageKeys} from './components'