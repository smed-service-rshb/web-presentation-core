export default class RestrictedItemsBuilder {
    data = {};
    restrictions = {};
    consumers = {};
    systemData = [];

    constructor(itemName, keyField, itemChecker) {
        this.keyField = keyField;
        this.itemName = itemName;
        this.itemChecker = itemChecker;
    }

    _isSystemResource = key => this.systemData.includes(key);

    _error = (moduleName, message) => {
        throw new Error(`При регистрации ресурса '${this.itemName}' модуля '${moduleName}' произошла ошибка: ${message}.`);
    };

    _warning = (moduleName, message) => {
        console.warn(`При регистрации ресурса '${this.itemName}' модуля '${moduleName}' произошла ошибка: ${message}.`);
    };

    add = (item, moduleName) => {
        this.itemChecker(item, {
            warning: message => this._warning(moduleName, `ресурс ${item[this.keyField]} - ${message}`),
            error: message => this._error(moduleName, `ресурс ${item[this.keyField]} - ${message}`),
        });

        const itemKey = item[this.keyField];

        if (this.data[itemKey]) {
            this._error(moduleName, `обнаружен дубликат ресурса с ключом '${itemKey}' в модуле ${this.data[itemKey].moduleName}.`);
        }

        if (this._isSystemResource(itemKey)) {
            this._error(moduleName, `обнаружен дубликат ресурса с ключом '${itemKey}' в системном модуле.`);
        }

        this.data[itemKey] = {
            ...item,
            moduleName,
        };
    };

    addSystem = item => {
        const itemKey = item[this.keyField];
        this.systemData.push(itemKey);
    };

    restrict = moduleName => {
        if (this.restrictions[moduleName] === undefined) {
            this.restrictions[moduleName] = {
                excluding: key => {
                    if (this.consumers[key] === undefined) {
                        this.consumers[key] = [];
                    }
                    this.consumers[key].push(moduleName);
                },
            };
        }

        return this.restrictions[moduleName];
    };

    resolve = (itemKey, consumer) => {
        if (this._isSystemResource(itemKey)) {
            return;
        }

        const registeredItem = this.data[itemKey];

        if (!registeredItem) {
            throw new Error(`Для ресурса '${this.itemName}' с ключом '${itemKey}' не найдено определения.`);
        }

        if (registeredItem.moduleName === consumer) {
            return;
        }

        if (this._restricted[itemKey].includes(consumer)) {
            console.error(`Для ресурса '${this.itemName}' с ключом '${itemKey}' не добавлено зависимости в модуле ${consumer}.`);
        }
    };

    _checkRestrictedConsumers = () => {
        if (Object.keys(this.restrictions).length === 0) {
            throw new Error(`Не найден модуль для тестирования (для тестируемого модуля необходмо указать зависимости, либо их отсутствие).`);
        }
    };

    _checkExpectedResources = () => {
        const errors = Object.keys(this.consumers).reduce((accumulated, current) => {
            if (this.data[current] === undefined) {
                const error = {};
                error['отсутствующий ключ ресурса'] = current;
                error['зависимые модули'] = this.consumers[current];

                accumulated.push(error);
            }
            return accumulated;
        }, []);

        if (errors.length !== 0) {
            throw new Error(`Ошибка конфигурирования ресурса '${this.itemName}':\n${JSON.stringify(errors, null, 2)}.`);
        }
    };

    build = () => {
        this._checkRestrictedConsumers();
        this._checkExpectedResources();

        const allRestrictedModules = Object.keys(this.restrictions);
        this._restricted = Object.keys(this.data).reduce((accumulated, current) => {
            const itemKey = this.data[current][this.keyField];
            const excludingModules = this.consumers[itemKey] || [];
            accumulated[itemKey] = allRestrictedModules.filter(module => !excludingModules.includes(module));
            return accumulated;
        }, {});
        return Object.keys(this.data).map(key => this.data[key]);
    };
}
