const error = message => {
//    console.error(message);
    throw new Error(message)
};

export default class ServiceLocator {
    constructor() {
        this.services = {}
    }

    register = (key, service) => {
        if (!key) {
            error('Для регистрации сервиса необходим key.')
        }
        if (!service) {
            error('Для регистрации сервиса необходим service.')
        }
        if (this.services[key]) {
            error(`Сервис с ключом ${key} yже зарегистрирован.`)
        }

        this.services[key] = service
    };

    resolve = (key) => {
        let service = this.services[key];
        if (!service) {
            error(`Сервис с ключом ${key} не зарегистрирован.`)
        }
        return service;
    };

    list = () => {
        return Object.keys(this.services).map(key => this.services[key])
    }
}