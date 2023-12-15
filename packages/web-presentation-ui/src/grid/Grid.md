## Компонент Grid



Пример использования:
```

let columns = [
    {key: 'key', name: 'Идентификатор', data : data => <b>{data}</b>},
    {key: 'name', name: 'Наименование'},
    {key: 'finalDate', name: 'Дата исполнения'},
    {key: 'sum', name: 'Сумма', data : (data, row) => `${data} руб. для ${row.name}`},
    {key: 'type', name: 'Тип источника данных'},
];

let dataCount = 123;
const createData = (type) => {
    let data = [];
    for (let i = 0; i < dataCount; i++) {
        data.push({
            key: 'Идентификатор_' + i,
            name: i+'_Наименование',
            finalDate: new Date(2016, i / 20, i % 20).toString(),
            sum: i,
            type
        })
    }
    return data;
};

const filterData = (data, filter) => data.filter(record=>(!filter.name||record.name.startsWith(filter.name)));

const getData = (data) => (filter={}, offset=0, size=10) => {
    const rows = filterData(data, filter)
    return Promise.resolve({
        rows:rows.slice(offset, offset + size),
        hasMore: offset + size < rows.length
    })
};

const getSpringPageableData = (data) => (filter={}, page=0, size=10) => {
    const rows = filterData(data, filter);
    const offset = page*size;
    const totalElements = rows.length;
    return Promise.resolve({
        content: rows.slice(offset, offset + size),
        first: page === 0,
        last: offset + size >= totalElements,
        size: size,
        totalElements: totalElements,
        totalPages: totalElements%size
    });
}

const dataSource = Grid.createDataSource(getData(createData('Default')));
const springPageableDataSource = Grid.createSpringPageableDataSource(getSpringPageableData(createData('Spring')));

const onFilterChange = dataSource => (e) => dataSource.setFilter({name:e.target.value});
    
class Example extends React.Component  {
    constructor(props){
        this.state={
            checkboxDisabledDefDS: false, 
            checkboxDisabledSpringDS: false
        }
        this.onFilterChange= onFilterChange.bind(this)
    }

    render () {
        return (
        <div>
            <Label children="Default DataSource"/>
            <Panel dataId="panelFormGrid">
                Наименование: <input value={this.state.filter} onChange= {this.onFilterChange(dataSource)}/>
                <Button name="Вкл/выкл чекбоксы" dataId="on-off-checkboxes" onClick={()=>{this.setState({checkboxDisabledDefDS: !this.state.checkboxDisabledDefDS})}} />
                <Grid
                    ref={node => {this.grid = node;}}
                    columns = {columns}
                    dataSource = {dataSource}
                    emptyMessage = "Данные не найдены. Уточните параметры поиска."
                    onCellClick = {(rowData, columnKey) =>{alert('Ключ колонки: '+columnKey +'. Данные сроки '+JSON.stringify(rowData, null, 2))}}
                    checkboxDisabled = {this.state.checkboxDisabledDefDS}
                    dataId="gridId"
                >
                    <div className="float-right" >
                        <Button type={Button.buttonTypes.specialOrange} name="Отключить" dataId="btn-off" onClick={()=>{alert(JSON.stringify(this.grid.getSelectedRows(), null, 2))}}/>
                        <Button type={Button.buttonTypes.specialOrange} name="Включить" dataId="btn-on" onClick={()=>{alert(JSON.stringify(this.grid.getSelectedRows(), null, 2))}}/>
                    </div>
                    <Button type={Button.buttonTypes.secondary} name="Настройки" dataId="btn-settings" onClick={selectedRows=>{alert(JSON.stringify(selectedRows, null, 2))}}/>
                </Grid>
            </Panel>
            
            <Label children="Spring Pageable DataSource"/>
            <Panel dataId="panelFormGridSpringDS">
                Наименование: <input value={this.state.filter} onChange= {this.onFilterChange(springPageableDataSource)}/>
                <Button name="Вкл/выкл чекбоксы" dataId="on-off-checkboxes" onClick={()=>{this.setState({checkboxDisabledSpringDS: !this.state.checkboxDisabledSpringDS})}} />
                <Grid
                    ref={node => {this.gridSpring = node;}}
                    columns = {columns}
                    dataSource = {springPageableDataSource}
                    emptyMessage = "Данные не найдены. Уточните параметры поиска."
                    onCellClick = {(rowData, columnKey) =>{alert('Ключ колонки: '+columnKey +'. Данные сроки '+JSON.stringify(rowData, null, 2))}}
                    checkboxDisabled = {this.state.checkboxDisabledSpringDS}
                    dataId="gridSpringId"
                >
                    <div className="float-right" >
                        <Button type={Button.buttonTypes.specialOrange} name="Отключить" dataId="btn-off" onClick={()=>{alert(JSON.stringify(this.gridSpring.getSelectedRows(), null, 2))}}/>
                        <Button type={Button.buttonTypes.specialOrange} name="Включить" dataId="btn-on" onClick={()=>{alert(JSON.stringify(this.gridSpring.getSelectedRows(), null, 2))}}/>
                    </div>
                    <Button type={Button.buttonTypes.secondary} name="Настройки" dataId="btn-settings" onClick={selectedRows=>{alert(JSON.stringify(selectedRows, null, 2))}}/>
                </Grid>
            </Panel>
        </div>)
    };
}
<Example />
```