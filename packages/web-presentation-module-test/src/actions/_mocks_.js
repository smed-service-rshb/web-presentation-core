import {CRUDService, mockRoute} from "@efr/medservice-web-presentation-utils-mock";

import {CLIENTS, PRODUCT_INFO, PRODUCTS_LIST} from './clients';

const ENTITIES = [
    {
        id: 1,
        name: 'Сущность номер раз',
        description: "Description1",
        needDescription: true,
        date: '12.12.2017',
        datepicker: '11.11.2018'
    },
    {
        id: 2,
        name: 'Сущность номер два',
        description: "Description2",
        needDescription: false,
        date: '11.05.2018',
        datepicker: '11.02.2018'
    }
];

const PRODUCTS = [{
    "id": 1,
    "type": "card",
    "name": "card1",
    "number": "11111111111111111111",
    "rest": 10.1,
    "currency": "RUB",
    "department": "48987",
    "authorityId": null
}, {
    "id": 2,
    "type": "card",
    "name": "card2",
    "number": "11111111111111111112",
    "rest": 10.2,
    "currency": "RUB",
    "department": "48987",
    "authorityId": null
}, {
    "id": 1,
    "type": "account",
    "name": "account1",
    "number": "42665465121648465464",
    "rest": 10.1,
    "currency": "RUB",
    "department": "875465",
    "authorityId": null
}];

const INTERNAL_TRANSFER = {
    clientData: {
        id: null
    },
    commissionInfo: null,
    purposeOfPayment: null,
    fromResources: PRODUCTS,
    toResources: PRODUCTS,
};

const entitiesService = new CRUDService(ENTITIES);

const GET_INIT_DATA_INTERNAL_TRANSFER = ({success}) => success(INTERNAL_TRANSFER);

const ENTITIES_LIST = ({success}) => success(entitiesService.getRecords());

const ENTITIES_DETAILS = ({success, error, request}) => {
    const entity = entitiesService.getRecord(request.params.id);

    entity && success(entity);
    !entity && error(404);
};

const ENTITY_SAVE = ({success, error, request}) => {
    const result = entitiesService.updateRecord(request.params.id, request.body);

    result && success();
    !result && error(404);
};

const ENTITY_CREATE = ({success, request}) => {
    const maxId = entitiesService.reduceRecords((prev, record) => Math.max(prev, record.id), 0);
    const newEntity = {
        ...request.body,
        id: maxId + 1
    };

    const record = entitiesService.createRecord(newEntity);
    success(record);
};

const ERROR_CREATE = ({error, request}) => {
    setTimeout(() => {
        error(request.params.numberError)
    }, 2000);

};

const AVATAR_UPLOAD = ({success, error, request}) => {
    const {file} = request.body;
    file && success({
        name: file.name,
        type: file.type
    });
    !file && error(500)
};

const UPLOAD = ({plaintext, error, request}) => {
    const file = request.files && request.files.filename;
    file && plaintext({
        name: file.name,
        mimetype: file.mimetype,
        md5: file.md5,
    });
    !file && error(500)
};

const DOWNLOAD = ({download}) => {
    download(__dirname + '/_mocks_.js')
};

const IB6_PAGE = ({success, request}) => success('dbo query ' + JSON.stringify(request.query));

export const IB6Mocks = {
    SHOW_PAGE: mockRoute.get('/page', IB6_PAGE)
};

export default {
    GET_INIT_DATA_INTERNAL_TRANSFER: mockRoute.get('/clients/:clientId/internalTransfers/initialData', GET_INIT_DATA_INTERNAL_TRANSFER),
    ENTITIES_LIST: mockRoute.get('/entities', ENTITIES_LIST),
    ENTITIES_DETAILS: mockRoute.get('/entities/:id', ENTITIES_DETAILS),
    ENTITY_SAVE: mockRoute.put('/entities/:id', ENTITY_SAVE),
    ENTITY_CREATE: mockRoute.post('/entities', ENTITY_CREATE),
    GET_ERROR: mockRoute.get('/error/:numberError', ERROR_CREATE),
    GET_CLIENTS: mockRoute.get('/clients/find', CLIENTS),
    GET_PRODUCTS_LIST: mockRoute.get('/products/:systemId/:clientId', PRODUCTS_LIST),
    GET_PRODUCT_INFO: mockRoute.get('/products/:systemId/:clientId/:productId', PRODUCT_INFO),
    AVATAR_UPLOAD: mockRoute.post('/upload/avatar', AVATAR_UPLOAD),
    UPLOAD: mockRoute.post('/upload', UPLOAD),
    DOWNLOAD: mockRoute.get('/download', DOWNLOAD),
}