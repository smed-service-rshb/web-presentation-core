## Компонент Spreadsheet

Пример использования:
```

class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    checked: true,
                    stringValue: 'Надпись1'
                },
                {
                    checked: false,
                    stringValue: 'Надпись2',
                    input: "Предзаполненное текстовое поле"
                },
                {
                    checked: true,
                    stringValue: 'Надпись3'
                }
            ]
        }
        columns = [
                {
                    key: 'checked',
                    name: () => <Checkbox onChange={this.switchSelectionAll} checked={this.getSelectedRows()===this.state.rows.length} dataId='-name-checkbox'/>,
                    data: (row, index) => <Checkbox onChange={selected => this.checkedDataOnChange(row, index, selected)} checked={row.checked} dataId='data-checkbox'/>,
                    headerStyle: {'width' : '20px'},
                    cellStyle: {textAlign: 'center'}

                },
                {
                    key: 'stringValue',
                    name: 'Столбец со строчками',
                },
                {
                    key: 'input',
                    name: () => <div>Столбец с вводом</div>,
                    data: (row, index) => <Input onChange={value => this.inputDataOnChange(row, index, value)} value={row.input} dataId='data-input'/>,
                },

        ];
        this.checkedDataOnChange = this.checkedDataOnChange.bind(this);
        this.inputDataOnChange = this.inputDataOnChange.bind(this);
        this.switchSelectionAll = this.switchSelectionAll.bind(this);
    }

    checkedDataOnChange (row, index, selected) {
        let rowsCopy = this.state.rows;
        rowsCopy[index].checked = selected;
        this.setState({
            rows: rowsCopy
        })
    }

    switchSelectionAll (selected) {
        this.setState({
            rows: this.state.rows.map(row => {
                return {
                    ...row,
                    checked: selected
                }
            })
        })
    }

    getSelectedRows () {
        return this.state.rows.reduce(function(previousValue, currentValue) {
             return currentValue.checked ? (previousValue+1) : previousValue;
        },0)
    }

    inputDataOnChange (row, index, value) {
        let rowsCopy = this.state.rows;
        rowsCopy[index].input = value;
        this.setState({
            rows: rowsCopy
        })
    }

    render () {
        return(
            <div>
                <Spreadsheet columns={columns} rows={this.state.rows} dataId="spreadsheet" align="center"/>
                <Button onClick={()=>{alert(JSON.stringify(this.state, null, 2))}} name="Вывести выбранные данные на экран" dataId="button"/>
            </div>
        )
    };
}
<Example />
```

Пример использования 2:
```
const roles =[
    {
        name: 'OPR',
        stringValue: 'Роль1',
    },
    {
        name: 'OZP',
        stringValue: 'Роль2',
    },
    {
        name: 'VVP',
        stringValue: 'Роль3',
    }
]

class Example2 extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            selectedRows : ['OZP']
        }
        columns = [
                {
                    key: 'stringValue',
                    name: 'Название роли',
                },
                {
                    key: 'name',
                    name: 'Код роли',
                },
                {
                    key: 'Toggle',
                    name: () => <div>Доступно</div>,
                    data: (row, index) =>  <Toggle checked={this.isRoleChecked(row.name)} onChange={toggled => this.toggleSelectedRole(row.name, toggled)} dataId="toggle1"/>,
                },

        ];
        this.isRoleChecked.bind(this);
        this.toggleSelectedRole.bind(this);
    }

    isRoleChecked(role){
       return this.state.selectedRows.includes(role)
    }

    toggleSelectedRole(name, toggled){
        if (toggled && !this.state.selectedRows.includes(name)){
           const selectedRows = this.state.selectedRows;
           selectedRows.push(name)
           this.setState({selectedRows})
        }else{
           this.setState({selectedRows:this.state.selectedRows.filter(role => role!==name)})
        }
    }

    render () {
        return(
            <div>
                <Spreadsheet columns={columns} rows={roles} dataId="spreadsheet" align="center"/>
                <Button onClick={()=>{alert(JSON.stringify(this.state, null, 2))}} name="Вывести выбранные данные на экран" dataId="button"/>
            </div>
        )
    };
}
<Example2 />
```