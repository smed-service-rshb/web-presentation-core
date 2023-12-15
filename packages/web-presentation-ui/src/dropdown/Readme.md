## Компонент Выпадающее меню

Пример использования:
```
class Example extends React.Component  {
    getDropdownItems () {
        return [
            {name: 'Переводы между счетами клиента', id: 'Dropdown_1', onClick: function(){console.log('Переводы между счетами клиента')}},
            {name: 'Пополнение  наличными денежными средствами', id: 'Dropdown_2', onClick: function(){console.log('Пополнение  наличными денежными средствами')}},
            {name: 'Расходная операция', id: 'Dropdown_3', onClick: function(){console.log('Расходная операция')}}
        ]
    };
    getDropdownItems2 () {
        return [
            {name: 'Закрытие вклада', id: 'Dropdown_4', onClick: function(){console.log('Закрытие вклада')}},
            {name: 'Переоформление на третье лицо', id: 'Dropdown_5', onClick: function(){console.log('Переоформление на третье лицо')}},
            {name: 'Оформление доверенности/ завещания', id: 'Dropdown_6', onClick: function(){console.log('Оформление доверенности/ завещания')}},
            {name: 'Выписка по вкладу', id: 'Dropdown_7', onClick: function(){console.log('Выписка по вкладу')}}
        ]
    };

    render () {
        return(
            <div>
                <Dropdown values={this.getDropdownItems()} id="first-dropdown" name="Операции"/>
                <Dropdown values={this.getDropdownItems()} id="first-dropdown2" disabled name="Операции"/>
                <Dropdown values={this.getDropdownItems2()} id="first-dropdown3" name="Операции"/>
                <Dropdown values={this.getDropdownItems()} id="first-dropdown2" type="secondary" name="Выпадающее меню типа secondary"/>
            </div>
        )
    };
}
<Example />
```