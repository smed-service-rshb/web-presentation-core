const initTransfer = ({RestClient}, clientId) => {
    return RestClient
        .get(`/clients/${clientId}/internalTransfers/initialData`)
        .then(response => response.body)
};

const getError = ({RestClient}, numberError) => {
    return RestClient
        .get(`/error/${numberError}`)
};

const list = ({RestClient}, filter = {}, offset, size) => {
    return RestClient
        .get('/entities')
        .query({offset, size})
        .then(response => response.body)
        .catch(err => {
            if (err.timeout) {
                throw new Error("Операция временно недоступна.")
            }
            throw new Error(err.response.text)
        })
};

const details = ({RestClient}, id) => {
    return RestClient
        .get(`/entities/${id}`)
        .then(response => response.body)
};

const save = ({RestClient}, entity) => {
    return RestClient
        .put(`/entities/${entity.id}`, entity)
        .then(response => response.body)
};

const create = ({RestClient}, entity) => {
    return RestClient
        .post(`/entities`, entity)
        .then(response => response.body)
};

export const InitTransferAction = {
    name: 'init.data',
    action: initTransfer
};

export const GetError = {
    name: 'get.error',
    action: getError
};

export const EntitiesListAction = {
    name: 'entities.list',
    action: list
};

export const TasksListAction = {
    name: 'tasks.list',
    action: list
};

export const EntitiesDetailsAction = {
    name: 'entities.Details',
    action: details
};

export const EntitySaveAction = {
    name: 'entities.Save',
    action: save
};

export const EntityCreateAction = {
    name: 'entities.Create',
    action: create
};

const clientsList = ({RestClient}) => RestClient
    .get(`/clients/find`)
    .then(response => response.body);

const clientProductsList = ({RestClient}, {systemId, clientId}) => RestClient
    .get(`/products/${systemId}/${clientId}`)
    .then(response => response.body);

const fullProductInfoAction = ({RestClient}, {systemId, clientId, productId}) => RestClient
    .get(`/products/${systemId}/${clientId}/${productId}`)
    .then(response => response.body);

export const GetClientsAction = {
    name: 'clients.List',
    action: clientsList,
};
export const GetClientProductsAction = {
    name: 'client-products.List',
    action: clientProductsList,
};
export const GetFullProductInfoAction = {
    name: 'clients.FullProductInfoAction',
    action: fullProductInfoAction,
};
const saveAvatar = ({RestClient}, file) => {
    return RestClient
        .post(`/upload/avatar`)
        .send({file})
        .then(response => response.body)
};
export const SaveAvatar = {
    name: 'save.Avatar',
    action: saveAvatar
};