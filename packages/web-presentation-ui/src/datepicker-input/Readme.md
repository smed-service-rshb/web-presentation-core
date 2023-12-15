## Компонент календарь с инпутом


Пример использования:
```

class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            value: '11.11.1993',
            value2: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange(date) {
        this.setState({
          value: date
        });
      }

    handleChange2(date) {
        this.setState({
          value2: date
        });
    }

    render () {
        return(
            <div>
               <InputDatepicker value={this.state.value} onChange={this.handleChange} dataId="InputDatepickerIds1"/>
               <br/>
               <InputDatepicker value={this.state.value} disabled onChange={this.handleChange} dataId="InputDatepickerIds2"/>
               <br/>
               <InputDatepicker value={this.state.value2} onChange={this.handleChange2} dataId="InputDatepickerIds3"/>
               <br/>
               <br/>
               <Button onClick={()=>{alert(JSON.stringify(this.state, null, 2))}} name="Показать значения в state" dataId="ButtonId6"/>
            </div>
        )
    };
}
<Example />
```
