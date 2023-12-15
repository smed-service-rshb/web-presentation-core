import replicate from './menu-replicator'


const administrating = 'administrating';
const settings = 'settings';
const clients = 'clients';
const tasks = 'tasks';
const documents = 'documents';
const mail = 'mail';

const primary = {
    [administrating]: {
        name: 'Администрирование',
        children: [{
            name: 'Доверенности сотрудников',
        }, {
            name: 'Список сервисов',
        }],
    },
    [settings]: {
        name: 'Настройки',
        children: [{
            name: 'Настройки микросервисов',
            children: [{
                name: 'Настройки микросервисов',
            }],
        }],
    },
    [clients]: {
        name: 'Клиенты',
        children: [{
            name: 'Поиск',
        }, {
            name: 'Анкета',
            children: [{
                name: 'Продукты',
            }, {
                name: 'Данные клиента',
            }],
        }],
    },
    [tasks]: {
        name: 'Задачи',
        children: [{
            name: 'Мои задачи',
        }, {
            name: 'Задачи подразделения',
        }],
    },
};

const secondary = {
    [administrating]: {
        name: 'Администрирование',
        children: [{
            name: 'Устройства генерации паролей',
        }, {
            name: 'Список клиентов «РСХБ-Управление активами»',
        }],
    },
    [documents]: {
        name: 'Документы',
        children: [{
            name: 'Журнал заявок и платежей',
        }, {
            name: 'Список клиентов «РСХБ-Управление активами»',
        }],
    },
    [settings]: {
        name: 'Настройки',
        children: [{
            name: 'Матрица доступных переводов',
        }, {
            name: 'Настройки микросервисов',
            children: [{
                name: 'Настройки микросервиса саморегистрации',
            }, {
                name: 'Настройки фоновых задач микросервиса саморегистрации',
            }],
        }],
    },
    [mail]: {
        name: 'Почта',
        children: [{
            name: 'Почтовые ящики',
            children: [{
                name: 'Список входящих',
            }, {
                name: 'Список исходящих',
            }],
        }, {
            name: 'Администрирование',
            children: [{
                name: 'Почтовые ящики пользователей',
            }, {
                name: 'Почтовые ящики филиалов',
            }, {
                name: 'Почтовые ящики обращений',
            }],
        }],
    },
};

const expected = {
    [administrating]: {
        name: 'Администрирование',
        children: [{
            name: 'Доверенности сотрудников',
        }, {
            name: 'Список сервисов',
        }, {
            name: 'Устройства генерации паролей',
        }, {
            name: 'Список клиентов «РСХБ-Управление активами»',
        }],
    },
    [documents]: {
        name: 'Документы',
        children: [{
            name: 'Журнал заявок и платежей',
        }, {
            name: 'Список клиентов «РСХБ-Управление активами»',
        }],
    },
    [settings]: {
        name: 'Настройки',
        children: [{
            name: 'Настройки микросервисов',
            children: [{
                name: 'Настройки микросервисов',
            }, {
                name: 'Настройки микросервиса саморегистрации',
            }, {
                name: 'Настройки фоновых задач микросервиса саморегистрации',
            }],
        }, {
            name: 'Матрица доступных переводов',
        }],
    },
    [clients]: {
        name: 'Клиенты',
        children: [{
            name: 'Поиск',
        }, {
            name: 'Анкета',
            children: [{
                name: 'Продукты',
            }, {
                name: 'Данные клиента',
            }],
        }],
    },
    [tasks]: {
        name: 'Задачи',
        children: [{
            name: 'Мои задачи',
        }, {
            name: 'Задачи подразделения',
        }],
    },
    [mail]: {
        name: 'Почта',
        children: [{
            name: 'Почтовые ящики',
            children: [{
                name: 'Список входящих',
            }, {
                name: 'Список исходящих',
            }],
        }, {
            name: 'Администрирование',
            children: [{
                name: 'Почтовые ящики пользователей',
            }, {
                name: 'Почтовые ящики филиалов',
            }, {
                name: 'Почтовые ящики обращений',
            }],
        }],
    },
};

const administratingWithoutChild = {
    name: 'Администрирование',
};

const expectMenu = actualMenu => {
    const toEqualItems = expectedMenu => expect(JSON.stringify(actualMenu, null, 2)).toEqual(JSON.stringify(expectedMenu, null, 2));
    return {
        toEqualExpected: expectedMenu => toEqualItems(expectedMenu.map(key => expected[key])),
        toEqualItems,
    }
};

const replicateMenu = (primaryMenu, secondaryMenu) => replicate((primaryMenu || []).map(key => primary[key]), (secondaryMenu || []).map(key => secondary[key]));

describe('menu-replicator', () => {
    test('when not defined primaryMenu and not defined secondaryMenu, then return empty menu', () => {
        const expectedMenu = [];
        const actualMenu = replicate();
        expectMenu(actualMenu).toEqualItems(expectedMenu);
    });
    test('when defined primaryMenu and not defined secondaryMenu, then return primaryMenu', () => {
        const primaryMenu = [clients, tasks];
        const actualMenu = replicateMenu(primaryMenu);
        expectMenu(actualMenu).toEqualExpected(primaryMenu);
    });
    test('when primaryMenu and secondaryMenu not intersected, then return primaryMenu before secondaryMenu', () => {
        const expectedMenu = [clients, tasks, documents, mail];
        const primaryMenu = [clients, tasks];
        const secondaryMenu = [documents, mail];
        const actualMenu = replicateMenu(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualExpected(expectedMenu);
    });
    test('when primaryMenu and secondaryMenu intersected, then return primaryMenu before secondaryMenu', () => {
        const expectedMenu = [administrating, tasks, documents];
        const primaryMenu = [administrating, tasks];
        const secondaryMenu = [documents, administrating];
        const actualMenu = replicateMenu(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualExpected(expectedMenu);
    });
    test('full merging', () => {
        const expectedMenu = [administrating, clients, settings, tasks, mail, documents];
        const primaryMenu = [administrating, clients, settings, tasks];
        const secondaryMenu = [mail, documents, settings, administrating];
        const actualMenu = replicateMenu(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualExpected(expectedMenu);
    });
    test('when primaryMenu (without child) and secondaryMenu (without child) intersected, then return primaryMenu before secondaryMenu', () => {
        const expectedMenu = [administratingWithoutChild, administratingWithoutChild];
        const primaryMenu = [administratingWithoutChild];
        const secondaryMenu = [administratingWithoutChild];
        const actualMenu = replicate(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualItems(expectedMenu);
    });
    test('when primaryMenu (without child) and secondaryMenu (with child) intersected, then return primaryMenu before secondaryMenu', () => {
        const expectedMenu = [administratingWithoutChild, secondary.administrating];
        const primaryMenu = [administratingWithoutChild];
        const secondaryMenu = [secondary.administrating];
        const actualMenu = replicate(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualItems(expectedMenu);
    });
    test('when primaryMenu (with child) and secondaryMenu (without child) intersected, then return primaryMenu before secondaryMenu', () => {
        const expectedMenu = [primary.administrating, administratingWithoutChild];
        const primaryMenu = [primary.administrating];
        const secondaryMenu = [administratingWithoutChild];
        const actualMenu = replicate(primaryMenu, secondaryMenu);
        expectMenu(actualMenu).toEqualItems(expectedMenu);
    });
});
