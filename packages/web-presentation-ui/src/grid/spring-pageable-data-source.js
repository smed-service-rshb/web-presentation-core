import DataSource from "./data-source";

export default class SpringPageableDataSource extends DataSource {

    load = () => {
        this.dataReceiver(this.filter, this.page - 1, this.size)
            .then(data => this.processLoadedData({
                rows: data.content,
                hasMore: !data.last
            }));
    }
}