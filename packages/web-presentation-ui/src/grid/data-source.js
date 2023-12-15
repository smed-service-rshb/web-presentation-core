const NOP = () => {
};
export default class DataSource {
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
        this.page = 1;
        this.size = 10;
        this.listener = NOP
    }

    listen = (listener = NOP) => {
        //TODO что делать, если уже зареган?

        this.listener = listener;
        if (this.data) {
            this.listener(this.data);
        }
        return () => {
            this.listener = NOP
        }
    };

    changePage = page => {
        this.page = page;
        this.load()
    };

    changeSize = size => {
        this.page = 1;
        this.size = size;
        this.load()
    };

    getPage = () => this.page;

    getSize = () => this.size;

    setFilter = filter => {
        this.page = 1;
        this.filter = filter;
        this.load()
    };

    processLoadedData = data => {
        this.listener(data);
        this.data = data;
    };

    load = () => {
        this.dataReceiver(this.filter, (this.page - 1) * this.size, this.size)
            .then(this.processLoadedData)
    }
}
//TODO Покрыть тестами