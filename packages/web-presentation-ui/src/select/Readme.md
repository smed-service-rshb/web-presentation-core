## Компонент Select

Ширина по умолчанию 100%.

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {value: '3'}
        this.changeState = this.changeState.bind(this);
    }

    getOptions () {
        return [
            {value: '1', label: 'Первый вариант'},
            {value: '2', label: 'Второй вариант'},
            {value: '3', label: 'Третий вариант'},
            {value: '4', label: '4 вариант'},
            {value: '5', label: '5 вариант'},
            {value: '6', label: '6 вариант'},
            {value: '7', label: '7 вариант'},
            {value: '8', label: '8 вариант'},
            {value: '9', label: '9 вариант'},
            {value: '0', label: '0 вариант'},
            {value: '11', label: '11 вариант'},
            {value: '12', label: '12 вариант'}
        ]
    };

    render () {
        return(
            <div>
                <Select options={this.getOptions()}
                            value={this.state.value}
                            onChange={this.changeState}
                            id="selectId"
                            placeholder="qwerty"
                            dataId="select1"
                            width="20%"
                />
            </div>
        )
    };

    changeState (index) {
         this.setState({
            value: index
        });
        console.log(index.value);
    }
}
<Example />
```