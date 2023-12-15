import SystemModule from '@efr/medservice-web-presentation-core/src/module-system'

import RestrictedItemsBuilder from './RestrictedItemsBuilder';
import withDependencyComponent from './withDependencyComponent';


export const IGNORE_DEPENDENCY_ARGUMENT = {
    dependency: {
        action: () => {
        },
        modal: () => {
        },
        page: () => {
        },
        empty: () => {
        },
    },
};

const REQUIRED = true;
const NOT_REQUIRED = false;

const PAGE_DEFINITION = {
    key: REQUIRED,
    path: REQUIRED,
    component: REQUIRED,
    availability: NOT_REQUIRED,
};

const ACTION_DEFINITION = {
    name: REQUIRED,
    action: REQUIRED,
};

const MODAL_DEFINITION = {
    key: REQUIRED,
    component: REQUIRED,
};

const checkFields = fields => (item, {error}) => {
    const expectedFieldNames = Object.keys(fields);
    const actualFieldNames = Object.keys(item);
    actualFieldNames.forEach(field => {
        !expectedFieldNames.includes(field) && error(`найдено неизвестное поле '${field}'`);
    });
    expectedFieldNames.forEach(field => {
        if (fields[field] && (item[field] === undefined)) {
            error(`не задано обязательное поле ${field}`)
        }
    });
};

const pageValidator = (item, log) => {
    checkFields(PAGE_DEFINITION)(item, log);
    if (typeof item.availability === 'boolean') {
        log.warning(`${item.availability ? 'доступен без авторизации' : 'не доступен никогда'}:\n${JSON.stringify(item, null, 2)}`);
    }
};
const actionValidator = checkFields(ACTION_DEFINITION);
const modalValidator = checkFields(MODAL_DEFINITION);


export default modulesDefinition => {
    const pagesBuilder = new RestrictedItemsBuilder('Страница', 'key', pageValidator);
    const actionsBuilder = new RestrictedItemsBuilder('Экшен', 'name', actionValidator);
    const modalsBuilder = new RestrictedItemsBuilder('Модальное окно', 'key', modalValidator);

    const withRestrictedContext = moduleName => withDependencyComponent({
        actionResolver: key => actionsBuilder.resolve(key, moduleName),
        modalResolver: key => modalsBuilder.resolve(key, moduleName),
        pageResolver: key => pagesBuilder.resolve(key, moduleName),
    });

    SystemModule({
        name: key => key,
        page: page => pagesBuilder.addSystem(page),
        action: action => actionsBuilder.addSystem(action),
        modal: modal => modalsBuilder.addSystem(modal),
    });

    const wrap = componentWrapper => target => ({
        page: page => {
            const wrappedPage = {
                ...page,
                component: componentWrapper(page.component),
            };
            return target(wrappedPage)
        }
    });

    const restrictedDefinitionBuilder = (definition, componentWrapper) => originalDefinition => {
        definition({
            ...originalDefinition,
            ...IGNORE_DEPENDENCY_ARGUMENT,
            ...wrap(componentWrapper)(originalDefinition.page),
        })
    };

    const restrictedDefinitions = [];
    for (const definition of modulesDefinition) {
        let moduleName = 'Название не определено';

        const name = name => {
            moduleName = name;
        };
        const page = page => pagesBuilder.add(page, moduleName);
        const action = action => actionsBuilder.add(action, moduleName);
        const modal = modal => modalsBuilder.add(modal, moduleName);
        const dependencyAction = key => {
            actionsBuilder.restrict(moduleName).excluding(key);
            modalsBuilder.restrict(moduleName);
            pagesBuilder.restrict(moduleName);
        };
        const dependencyModal = key => {
            modalsBuilder.restrict(moduleName).excluding(key);
            actionsBuilder.restrict(moduleName);
            pagesBuilder.restrict(moduleName);
        };
        const dependencyPage = key => {
            pagesBuilder.restrict(moduleName).excluding(key);
            actionsBuilder.restrict(moduleName);
            modalsBuilder.restrict(moduleName);
        };
        const dependencyEmpty = () => {
            actionsBuilder.restrict(moduleName);
            modalsBuilder.restrict(moduleName);
            pagesBuilder.restrict(moduleName);
        };

        const ordered = (...cbs) => (...args) => {
            cbs.slice(0, cbs.length - 1).forEach(cb => {
                if (!cb.isCalled) {
                    throw new Error(`При регистрации модуля "${moduleName}" произошла ошибка: не вызвана функция "${cb.name}" до вызова "${cbs[cbs.length - 1].name}".`);
                }
            });

            cbs[cbs.length - 1].isCalled = true;
            return cbs[cbs.length - 1](...args);
        };

        definition({
            name: ordered(name),
            page: ordered(name, page),
            action: ordered(name, action),
            modal: ordered(name, modal),
            dependency: {
                action: ordered(name, dependencyAction),
                modal: ordered(name, dependencyModal),
                page: ordered(name, dependencyPage),
                empty: ordered(name, dependencyEmpty),
            },
        });

        const componentWrapper = withRestrictedContext(moduleName);
        restrictedDefinitions.push(restrictedDefinitionBuilder(definition, componentWrapper));
    }

    return {
        actions: actionsBuilder.build(),
        pages: pagesBuilder.build(),
        modals: modalsBuilder.build(),

        actionResolver: actionsBuilder.resolve,
        modalResolver: modalsBuilder.resolve,
        pageResolver: pagesBuilder.resolve,

        restrictedDefinitions,
    }
};
