## Компонент Переключатель

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            checked:  true
        };
        this.toggleChangeState = this.toggleChangeState.bind(this);
    }

    render () {
        return(
            <div>
                <Toggle checked={this.state.checked}
                        onChange={this.toggleChangeState}
                        description="Переключатель с описанием"
                        dataId="toggle1"
                />
            </div>
        )
    };

    toggleChangeState (checked)  {
        this.setState({
            checked
        },()=>{console.log(checked)});
    };
}
<Example />
```