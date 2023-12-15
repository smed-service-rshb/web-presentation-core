## Компонент Checkbox

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            checked:  true
        };
        this.checkboxChangeState = this.checkboxChangeState.bind(this);
    }

    render () {
        return(
            <div>
                <Checkbox checked={this.state.checked}
                        onChange={this.checkboxChangeState}
                        description="Checkbox активный"
                        dataId="checkboxActive"
                />
                <br />
                <br />
                <Checkbox checked={this.state.checked}
                        onChange={this.checkboxChangeState}
                        description="Checkbox неактивный"
                        disabled
                        dataId="checkboxDisabled"
                />
            </div>
        )
    };

    checkboxChangeState (checked)  {
        this.setState({
            checked
        },()=>{console.log(checked)});
    };
}
<Example />
```