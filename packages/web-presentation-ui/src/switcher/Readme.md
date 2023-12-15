## Компонент Переключатель

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            selectedItem: 'full_id',
            selected: 'usd',
            active: ''
        }
        this.switcherButtonChangeState = this.switcherButtonChangeState.bind(this);
        this.switcherSecondaryChangeState = this.switcherSecondaryChangeState.bind(this);
        this.switcherRadioChangeState = this.switcherRadioChangeState.bind(this);
    }

    getSwitcherItems () {
        return [
            {name: 'Полная идентификация', id: 'full_id'},
            {name: 'Упрощенная идентификация', id: 'simple_id'}
        ]
    };

    getSwitcherSecondaryItems () {
        return [
            {name: 'РУБ', id: 'rub'},
            {name: 'USD', id: 'usd'},
            {name: 'EUR', id: 'eur'}
        ]
    };

    getSwitcherRadioItems () {
        return [
            {name: 'Да', id: 'yes'},
            {name: 'Нет', id: 'no'},
            {name: 'Не знаю', id: 'don`t know'}
        ]
    };

    getSwitcherRadioItemsHorizontal () {
        return [
            {name: 'Да', id: 'yes'},
            {name: 'Нет', id: 'no'},
            {name: 'Не знаю  ывраорывпары ыр впоаыро аывоы ваоыв оаоывпаорыворапы ваы ваорывпаорыпв авы впароывпаорыпв арпы орвапыорв а ыоравпоырпароып аоыр апорыпа', id: 'don`t know'}
        ]
    };

    render () {
        return(
            <div>
                <Switcher values={this.getSwitcherItems()} selected={this.state.selectedItem} onChange={this.switcherButtonChangeState}/>
                <br/>
                <br/>
                <Switcher values={this.getSwitcherSecondaryItems()} selected={this.state.selected} onChange={this.switcherSecondaryChangeState} type="secondary" unSelectable/>
                <span>Any text</span>
                <br/>
                <br/>
                <Switcher values={this.getSwitcherRadioItems()} selected={this.state.active} onChange={this.switcherRadioChangeState} type="radio" unSelectable />
                <br/>
                <br/>
                <br/>
                <Switcher values={this.getSwitcherRadioItems()} selected={this.state.active} onChange={this.switcherRadioChangeState} type="radio" disabled/>
                <br/>
                <br/>
                <br/>
                <Switcher values={this.getSwitcherRadioItemsHorizontal()} selected={this.state.active} onChange={this.switcherRadioChangeState} type="radioVerticalList" unSelectable/>
                <br/>
            </div>
        )
    };

    switcherButtonChangeState (index)  {
        this.setState({
            selectedItem: index
        });
        console.log(index);
    };

    switcherSecondaryChangeState (index)  {
        this.setState({
            selected: index
        });
        console.log(index);
    };

    switcherRadioChangeState (index)  {
        this.setState({
            active: index
        });
        console.log(index);
    };
}
<Example />
```