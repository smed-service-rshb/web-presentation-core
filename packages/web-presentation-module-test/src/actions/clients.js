const system = (name, idOffset) => ({
    name,
    generateId: id => idOffset + id,
});

const abs = number => system(`abs ${number}`, number * 1000);

const abs1 = abs(1);
const abs2 = abs(2);
const abs3 = abs(3);
const cif = system('CIF', 9000);

const clients = [];
const products = {};

const clientsMapping = {};

const addClient = (name, clientNumber, ...systems) => {
    const forEachSystem = callback => {
        systems.forEach(system => {
            callback({clientId: system.generateId(clientNumber), systemId: system.name, name});
        });
    };
    const clientIdentifiers = [];
    const clientMapping = {};
    forEachSystem(({clientId, systemId, name}) => {
        clientIdentifiers.push({clientId, systemId});
        clients.push({clientId, systemId, name});
        clientMapping[systemId] = clientId;
    });

    Object.keys(clientMapping).forEach(systemId => {
        clientsMapping[`${systemId}-${clientMapping[systemId]}`] = clientIdentifiers;
    });

    const result = {};
    result.product = (id, system, productType) => {
        forEachSystem(({clientId, systemId}) => {
            const target = products[`${systemId}-${clientId}`] || [];
            if (!products[`${systemId}-${clientId}`]) {
                products[`${systemId}-${clientId}`] = target;
            }

            target.push({
                clientId: clientMapping[system.name],
                systemId: system.name,
                productId: system.generateId(clientNumber * 100 + id),
                productType,
            });

        });
        return result;
    };
    return result;
};

addClient("Ваня", 1, abs1, abs2, cif)
    .product(10, abs1, 'account')
    .product(11, abs1, 'card')
    .product(20, abs2, 'card');
addClient("Вася", 2, abs1, abs2, abs3, cif)
    .product(10, abs1, 'account')
    .product(20, abs2, 'card')
    .product(30, abs3, 'account');
addClient("Валера", 3, abs1, abs2, abs3, cif)
    .product(10, abs1, 'card')
    .product(20, abs2, 'card')
    .product(21, abs2, 'account');
addClient("Витя", 4, abs2, abs3, cif)
    .product(20, abs2, 'card')
    .product(21, abs2, 'card')
    .product(30, abs3, 'account');


const MANAGER_ABS = abs1.name;

const systemFilter = searchingSystem => ({systemId}) => systemId === searchingSystem;
const cifSystemFilter = systemFilter(cif.name);

const clientsList = () => {
    const targetSystemFilter = systemFilter(MANAGER_ABS);
    const existsInTargetSystemFilter = ({systemId, clientId}) => (clientsMapping[`${systemId}-${clientId}`] || []).filter(targetSystemFilter).length === 0;

    const targetSystemClients = clients.filter(targetSystemFilter);
    const cifSystemClients = clients.filter(cifSystemFilter).filter(existsInTargetSystemFilter);

    return Promise.resolve([...targetSystemClients, ...cifSystemClients]);
};

const clientProductsList = ({systemId, clientId}) => Promise.resolve(products[`${systemId}-${clientId}`] || []);

const profileInfoByProductInfo = ({systemId, clientId}) => {
    const clientIdentifiers = clientsMapping[`${systemId}-${clientId}`];

    const targetSystemFilter = systemFilter(MANAGER_ABS);
    const targetSystemClientIdentifiers = clientIdentifiers.filter(targetSystemFilter);
    if (targetSystemClientIdentifiers.length === 1) {
        return Promise.resolve(targetSystemClientIdentifiers[0]);
    }
    const cifClientIdentifiers = clientIdentifiers.filter(cifSystemFilter);
    if (cifClientIdentifiers.length === 1) {
        return Promise.resolve(cifClientIdentifiers[0]);
    }
    return Promise.reject({message: "Клиент не найден."});
};

const productFilter = wanted => checked => Object.keys(wanted).every(wantedKey => checked[wantedKey].toString() === wanted[wantedKey]);

const fullProductInfoAction = ({systemId, clientId, productId}) => {
    const productList = products[`${systemId}-${clientId}`] || [];
    const productInfo = productList.find(productFilter({systemId, clientId, productId}));

    if (!productInfo) {
        return Promise.reject({message: "Продукт не найден."});
    }

    return profileInfoByProductInfo(productInfo).then(clientInfo => ({clientInfo, productInfo}));
};

const interrupt = (cb, delay = 2) => (...params) => new Promise(success => {
    setTimeout(() => {
        success(cb(...params));
    }, delay * 1000);
});


export const CLIENTS = ({success, error}) => clientsList().then(success, error);
export const PRODUCTS_LIST = ({success, error, request}) => clientProductsList(request.params).then(success, error);
export const PRODUCT_INFO = interrupt(({success, error, request}) => fullProductInfoAction(request.params).then(success).catch(() => error(404)));
