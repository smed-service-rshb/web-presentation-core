## Компонент RadioButton

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            checked:  true,
            checked2:  false
        };
        this.radioButtonChangeState = this.radioButtonChangeState.bind(this);
        this.radioButtonChangeState2 = this.radioButtonChangeState2.bind(this);
    }

    render () {
        return(
            <div>
                <RadioButton checked={this.state.checked}
                        onChange={this.radioButtonChangeState}
                        dataId="checkboxActive"
                />
                <RadioButton checked={this.state.checked2}
                        onChange={this.radioButtonChangeState2}
                        dataId="checkboxActive2"
                        disabled
                />
            </div>
        )
    };

    radioButtonChangeState (checked)  {
        this.setState({
            checked
        },()=>{console.log(checked)});
    };
    radioButtonChangeState2 (checked2)  {
        this.setState({
            checked2
        },()=>{console.log(checked2)});
    };
}
<Example />
```