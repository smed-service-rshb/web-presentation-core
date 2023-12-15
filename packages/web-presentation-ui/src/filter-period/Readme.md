## Компонент FilterPeriod

Ширина по умолчанию 100%.

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }


    render () {
        return(
            <div>
                <FilterPeriod onChange={this.onChange} dataId="period-filter"/>
                <br/>
                <br/>
                <FilterPeriod start="01.09.2017" end="20.09.2017" onChange={this.onChange} dataId="period-filter"/>
            </div>
        )
    };

    onChange (value)  {
        if(!value.end || !value.start){
            alert("Задайте корректный период");
        }
        console.log('Выбранный период: ' + value.start, '- ' + value.end);
    };

}
<Example />
```