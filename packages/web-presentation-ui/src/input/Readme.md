## Компонент Input

Ширина по умолчанию 100%.

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            inputDateValue: '',
            inputNumberValue: '',
            inputDocValue: '1234d 678',
            inputPhoneValue: '',
            inputFloatValue: 'f1.1f1f23'
        }
        this.inputChangeState = this.inputChangeState.bind(this);
        this.inputNumberChangeState = this.inputNumberChangeState.bind(this);
        this.inputDocChangeState = this.inputDocChangeState.bind(this);
        this.inputPhoneChangeState = this.inputPhoneChangeState.bind(this);
        this.inputFloatChangeState = this.inputFloatChangeState.bind(this);
        this.inputDateValue = this.inputDateValue.bind(this);
    }

    render () {
        return(
            <div>
                <Input value={this.state.inputValue}
                       onChange={this.inputChangeState}
                       dataId="input1"
                       width="20%"
                />
                <br/>
                <br/>
                <Input value={this.state.inputValue}
                       onChange={this.inputChangeState}
                       dataId="input2"
                       disabled
                />
                <br/>
                <br/>
                <Input value={this.state.inputValue}
                       onChange={this.inputChangeState}
                       type="password"
                       error
                       dataId="input3"
                />
                <br/>
                <br/>
                <Input value={this.state.inputDateValue}
                       onChange={this.inputChangeDateState}
                       tabIndex={112}
                       mask={Input.getDateMask()}
                       placeholder="dfdf"
                       dataId="input4"
                />
                <br/>
                <br/>
                <Input value={this.state.inputNumberValue}
                       onChange={this.inputNumberChangeState}
                       tabIndex={113}
                       mask={Input.getNumberMask({integerLimit: 6})}
                       placeholder="dfdf"
                       dataId="input5"
                />
                <br/>
                <br/>
                <Input value={this.state.inputDocValue}
                       onChange={this.inputDocChangeState}
                       tabIndex={114}
                       mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                       dataId="input6"
                />
                <br/>
                <br/>
                <Input value={this.state.inputPhoneValue}
                       onChange={this.inputPhoneChangeState}
                       tabIndex={115}
                       mask={Input.getMobilePhoneMask()}
                       dataId="input7"
                />
                <br/>
                <br/>
                <Input value={this.state.inputFloatValue}
                       onChange={this.inputFloatChangeState}
                       tabIndex={113}
                       mask={Input.getNumberMask({integerLimit: 6, decimalLimit: 2})}
                       placeholder="dfdf"
                       dataId="input8"
                />
                <br/>
                <br/>
                <Button onClick={()=>{alert(JSON.stringify(this.state, null, 2))}} name="Показать значения инпутов в state" dataId="ButtonId1"/>
                <br/>
                <br/>
                <Button onClick={()=>{this.inputDocChangeState("sss123")}} name="Асинхронно задать новое значение 6 инпуту" dataId="ButtonId2"/>
                <br/>
                <br/>
                <Button onClick={()=>{this.inputChangeState("sss123")}} name="Асинхронно задать новое значение 1 инпуту" dataId="ButtonId3"/>

            </div>
        )
    };

    inputChangeState (value)  {
        this.setState({
            inputValue: value
        });
        console.log(value);
    };

    inputNumberChangeState (value)  {
        this.setState({
            inputNumberValue: value
        });
        console.log(value);
    };

    inputDocChangeState (value)  {
        this.setState({
            inputDocValue: value
        });
        console.log(value);
    };

    inputPhoneChangeState (value)  {
        this.setState({
            inputPhoneValue: value
        });
        console.log(value);
    };

    inputFloatChangeState (value)  {
        this.setState({
            inputFloatValue: value
        });
        console.log(value);
    };

    inputDateValue (value)  {
        this.setState({
            inputFloatValue: value
        });
        console.log(value);
    };

}
<Example />