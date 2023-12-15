## Компонент Textarea

Ширина по умолчанию 100%.

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            textareaValue: 'Поле ввода'
        }
        this.textareaChangeState = this.textareaChangeState.bind(this);
    }

    render () {
        return(
            <div>
                <Textarea value={this.state.textareaValue}
                          onChange={this.textareaChangeState}
                          rows={3}
                          dataId="textarea1"
                          width="20%"
                />
                <br/>
                <Textarea value={this.state.textareaValue}
                          onChange={this.textareaChangeState}
                          rows={3}
                          error
                          dataId="textarea2"
                />
            </div>
        )
    };

    textareaChangeState (value)  {
        this.setState({
            textareaValue: value
        });
        console.log(value);
    };

}
<Example />
```