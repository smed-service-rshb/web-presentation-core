## Компонент календарь

Пример использования:
```
moment = require('moment')
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            value: '07.07.2007'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          value: date
        });
      }

    render () {
        return(
            <div>
               <Datepicker value={this.state.value} onChange={this.handleChange} dataId="DatepickerId"/>
            </div>
        )
    };
}
<Example />
```
