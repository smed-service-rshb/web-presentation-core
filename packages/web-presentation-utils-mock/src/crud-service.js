export default class CRUDService {
    constructor(data = [],
                identify = id => record => parseInt(record.id, 10) === parseInt(id, 10)) {
        this.data = data;
        this.identify = identify
    }

    getRecord(identifier) {
        return this.data.find(this.identify(identifier))
    }

    deleteRecord(identifier) {
        const index = this.data.findIndex(this.identify(identifier));
        if (index === -1) {
            return false
        }
        this.data.splice(index, 1);
        return true
    }

    updateRecord(identifier, record) {
        const index = this.data.findIndex(this.identify(identifier));
        if (index === -1) {
            return false
        }
        this.data[index] = record;
        return true
    }

    getRecords() {
        return [...this.data]
    }

    filterRecords(predicate) {
        return this.data.filter(predicate)
    }

    reduceRecords(cb, initial) {
        return this.data.reduce(cb, initial);
    }

    createRecord(record) {
        this.data.push(record);
        return record
    }
}
//TODO покрыть тестами