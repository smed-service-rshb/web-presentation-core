import {PagesBuilder, ActionsBuilder, NavigationBuilder, ModalsBuilder} from './builders'
import processPages from './pages-processor'

const processModulesDefinition = modulesDefinition => {
    const pagesBuilder = new PagesBuilder();
    const actionsBuilder = new ActionsBuilder();
    const modalsBuilder = new ModalsBuilder();

    let moduleName;
    modulesDefinition.forEach(definition => {
        definition({
            name: module => { //TODO Проверка дубликаты
                moduleName = module
            },
            page: page => pagesBuilder.add(page, moduleName),
            action: action => actionsBuilder.add(action, moduleName),
            modal: modal => modalsBuilder.add(modal, moduleName)
        })
    });
    return {
        actions: actionsBuilder.build(),
        pages: pagesBuilder.build(),
        modals: modalsBuilder.build(),
    }
};

export default (modulesDefinition, navigationTree) => {
    const {pages, actions, modals} = processModulesDefinition(modulesDefinition);

    const navigation = new NavigationBuilder(navigationTree, pages).build();

    return authContext => ({
        pages: processPages(pages, authContext, navigation),
        modals,
        actions,
        authContext
    })
}