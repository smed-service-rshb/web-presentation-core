import {compose} from "@efr/medservice-web-presentation-core";
import {
    WithExternalActionDependency,
    WithExternalModalDependency,
    WithExternalPageDependency,
} from "@efr/medservice-web-presentation-utils-dev";

import providerModule, {permissions as providerModulePermissions,} from "@efr/medservice-web-presentation-module-test-provider";

import createMockLoginModule from "@efr/medservice-web-presentation-mock-auth-module";
import ModuleDefinition, {PageKeys, Permissions} from './src';

import * as ExternalActions from './src/constants/external-actions';
import * as ExternalModals from './src/constants/external-modals';
import * as ExternalPages from './src/constants/external-pages';


const unavailableMenuItem = menuItem => menuItem('Ты не пройдешь!!!').disabled();

const dir1 = (menuItem) => (
    menuItem(`dir1`, "menuItemDir1").withChildren([
        page1_1(menuItem),
        unavailableMenuItem(menuItem),
        page1_2(menuItem)
    ])
);

const dir2 = (menuItem) => (
    menuItem(`dir2`, "menuItemDir2").withChildren([
        dir2_1(menuItem),
        dir2_2(menuItem)
    ])
);

const dir2_1 = (menuItem) => (
    menuItem(`dir2-1`, "menuItemDir2-1").withChildren([
        page2_1_1(menuItem),
        page2_1_2(menuItem)
    ])
);

const dir2_2 = (menuItem) => (
    menuItem(`dir2-2`, "menuItemDir2-2").withChildren([
        page2_2_1(menuItem)
    ])
);


const page1_1 = (menuItem) => (
    menuItem(`1-1`, PageKeys.PAGE_1_1).toPage({
        key: PageKeys.PAGE_1_1,
    })
);

const page1_2 = (menuItem) => (
    menuItem(`1-2`, PageKeys.PAGE_1_2).toPage({
        key: PageKeys.PAGE_1_2,
    })
);

const page2_1_1 = (menuItem) => (
    menuItem(`2-1-1`, PageKeys.PAGE_2_1_1).toPage({
        key: PageKeys.PAGE_2_1_1,
    })
);

const page2_1_2 = (menuItem) => (
    menuItem(`2-1-2`, PageKeys.PAGE_2_1_2).toPage({
        key: PageKeys.PAGE_2_1_2,
    })
);

const page2_2_1 = (menuItem) => (
    menuItem(`2-2-1`, PageKeys.PAGE_2_2_1).toPage({
        key: PageKeys.PAGE_2_2_1
    })
);


const viewPage = (menuItem, id) => (
    menuItem(`Просмотр сущности ${id}`, PageKeys.VIEW_PAGE_KEY + id).toPage({
        key: PageKeys.VIEW_PAGE_KEY,
        params: {id}
    })
);

const navigation = menuItem => ([
    menuItem('Список  сущностей', PageKeys.LIST_PAGE_KEY).toPage({
        key: PageKeys.LIST_PAGE_KEY,
        related: [PageKeys.EDIT_PAGE_KEY]
    }),

    menuItem('Просмотр сущностей', "menuItemViewEntity").withChildren([
        viewPage(menuItem, 1),
        viewPage(menuItem, 15),
    ]),

    menuItem('Список платежей', PageKeys.PAYMENTS_LIST_PAGE_KEY).toPage({
        key: PageKeys.PAYMENTS_LIST_PAGE_KEY,
    }),

    menuItem('Администрирование', 'administrating').withChildren([
        menuItem('Доверенности сотрудников', 'poa').toPage({
            key: PageKeys.POA_PAGE_KEY,
        }),
    ]),

    menuItem('Клиенты', 'menuItemClients').withChildren([
        menuItem('Поиск клиента', PageKeys.FIND_CLIENT_FORM_PAGE_KEY).toPage({
            key: PageKeys.FIND_CLIENT_FORM_PAGE_KEY,
        }),
        menuItem('Анкета клиента', 'menuItemClientData').withChildren([
            menuItem('Продукты', PageKeys.CLIENT_PRODUCT_LIST_FORM_PAGE_KEY).toPage({
                key: PageKeys.CLIENT_PRODUCT_LIST_FORM_PAGE_KEY,
                mode: 'client-context',
                related: [
                    PageKeys.CLIENT_ACCOUNT_PRODUCT_FORM_PAGE_KEY,
                    PageKeys.CLIENT_CARD_PRODUCT_FORM_PAGE_KEY,
                ],
            }),

            menuItem('Данные клиента', PageKeys.CLIENT_FORM_PAGE_KEY).toPage({
                key: PageKeys.CLIENT_FORM_PAGE_KEY,
                mode: 'client-context',
                related: [
                    page => page.params && page.params.from === 'Переход из анкеты клиента',
                ],
            }),

            menuItem('Заблокированный пункт меню нового клиента').disabled({
                mode: 'new-client-context',
            }),

            menuItem('Данные нового клиента', PageKeys.CLIENT_FORM_PAGE_KEY).toPage({
                key: PageKeys.NEW_CLIENT_FORM_PAGE_KEY,
                mode: 'new-client-context',
            }),
        ]),
    ]),

    menuItem('Задачи', "menuItemTasks").withChildren([
        menuItem('Мои задачи', PageKeys.TASKS_LIST_PAGE_KEY).toPage({
            key: PageKeys.TASKS_LIST_PAGE_KEY,
        }),
    ]),

    unavailableMenuItem(menuItem),

    menuItem('Tree', "menuItemTree").withChildren([
        dir1(menuItem),
        dir2(menuItem)
    ]),

    menuItem('Долгий запрос', PageKeys.LONG_REQUEST_PAGE_KEY).toPage({
        key: PageKeys.LONG_REQUEST_PAGE_KEY,
    }),

    menuItem('Зависимые страницы', 'weak-pages').withChildren([
        menuItem('Зависимая от экшена', PageKeys.USE_RELATED_ACTION_PAGE_KEY).toPage({
            key: PageKeys.USE_RELATED_ACTION_PAGE_KEY,
        }),
        menuItem('Зависимая от модального окна', PageKeys.USE_RELATED_POPUP_PAGE_KEY).toPage({
            key: PageKeys.USE_RELATED_POPUP_PAGE_KEY,
        }),
        menuItem('Зависимая от страницы', PageKeys.USE_RELATED_PAGE_PAGE_KEY).toPage({
            key: PageKeys.USE_RELATED_PAGE_PAGE_KEY,
        }),
    ]),

    menuItem('Открытие страницы в новой вкладке', "openNewTab").toPage({
        key: PageKeys.NEW_TAB_PAGE_KEY,
        related: [PageKeys.NEW_TAB_PAGE_KEY]
    }),
]);

const mockLoginModule = createMockLoginModule([
    ...Object.keys(Permissions).map(key => Permissions[key]),
    ...Object.keys(providerModulePermissions).map(key => providerModulePermissions[key]),
]);

export const devDefinition = compose(
    WithExternalActionDependency(ExternalActions),
    WithExternalModalDependency(ExternalModals),
    WithExternalPageDependency(ExternalPages),
    ModuleDefinition,
);

const modules = [devDefinition, providerModule, mockLoginModule];

export default {
    navigation,
    modules,
}
