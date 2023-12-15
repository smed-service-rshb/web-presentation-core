## Компонент Form

Пример использования с другими компонентами:
```
class Example extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            value: '3',
            inputValue: '',
            valueDate: '11.11.1993',
            selectedItem: 'full_id'
        }
        this.inputChangeState = this.inputChangeState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeState = this.changeState.bind(this);
        this.switcherButtonChangeState = this.switcherButtonChangeState.bind(this);
    }


    getButtons () {
        return [
            <Button onClick={()=>{alert('Clicked 1')}} name="Сохранить" dataId="ButtonId9"/>,
            <Button onClick={()=>{alert('Clicked 2')}} type={Button.buttonTypes.secondary} name="Отменить" dataId="ButtonId10"/>
        ]
    };
    getOptions () {
        return [
            {value: '1', label: 'Первый вариант'},
            {value: '2', label: 'Второй вариант'},
            {value: '3', label: 'Третий вариант'}
        ]
    };
    handleChange(date) {
        this.setState({
          valueDate: date
        });
      }
    getSwitcherItems () {
          return [
              {name: 'Полная идентификация', id: 'full_id'},
              {name: 'Упрощенная идентификация', id: 'simple_id'}
          ]
      };
    getErrors () {
        return [
           'Ошибка 1',
           'Ошибка 2'
       ]
    };

    getWarnings () {
        return [
            'Предупреждение 1',
            'Предупреждение 2'
        ]
    };


    render () {
        return(
            <div>
                <Panel label="Поиск клиента" labelSecondary="Иванова Ульяна Ивановна" dataId="panelForm1">
                    <Form fieldColumns={2} buttons={this.getButtons()} dataId="form1"
                          errors={this.getErrors()} warnings={this.getWarnings()} notice={this.getWarnings()}>
                        <Fieldset title="Заголовок 1">
                            <Field title="Фамилия" hint="Текст подсказки.">
                            <Textarea value={this.state.inputValue}
                                      onChange={this.inputChangeState}
                                      rows={3}
                                      dataId="textarea1"
                            />
                            </Field>
                            <Field title="Тип документа" error="Ошибка поля">
                                <Select options={this.getOptions()}
                                        value={this.state.value}
                                        onChange={this.changeState}
                                        id="selectId"
                                        dataId="select1"
                                />
                            </Field>
                            <Field title="Имя">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input02"
                                />
                            </Field>
                            <Field title="Серия и номер ДУЛ" error="Ошибка поля">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input03"
                                />
                            </Field>
                            <Field title="Отчество">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input04"
                                />
                            </Field>
                            <Divider type="clear"/>
                            <Field title="Дата рождения" error="Ошибка поля" >
                                <InputDatepicker value={this.state.valueDate}
                                                 onChange={this.handleChange}
                                                 dataId="input0dfg"
                                />
                            </Field>
                            <Field title="Любое очень  длинное название поля" error="Ошибка поля">
                                Любой длинный текст. Любой длинный текст. Любой длинный текст. Любой длинный текст.
                            </Field>
                        </Fieldset>
                        <Divider/>
                        <Fieldset title="Заголовок 2">
                            <Field title="Имя">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input02"
                                />
                            </Field>
                            <Field title="Серия и номер ДУЛ">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input03"
                                />
                            </Field>
                            <Field title="Отчество">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input04"
                                />
                            </Field>
                        </Fieldset>
                    </Form>
                 </Panel>
                 <br/>
                <Panel label="Снятие со счета/вклада наличными"  dataId="panelForm2">
                    <Form buttons={this.getButtons()} dataId="form2">
                        <Fieldset>
                            <Field title="Адрес" selected>
                                <div className="float-right">
                                    <Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.additional} name="Найти" dataId="ButtonId6"/>
                                </div>
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input041"
                                       width="510px"
                                  />

                            </Field>
                            <Field title="Информация о комиссии">
                                Подтвержден
                            </Field>
                            <Divider type="incomplete"/>
                            <Field title="Тип телефона">
                                <Switcher values={this.getSwitcherItems()} selected={this.state.selectedItem} onChange={this.switcherButtonChangeState}/>
                            </Field>
                            <Field title="Счет/вклад для снятия">
                                <Select options={this.getOptions()}
                                        value={this.state.value}
                                        onChange={this.changeState}
                                        id="selectId"
                                        dataId="select2"
                                        width="200px"
                                />
                            </Field>
                            <Field title="Сумма снятия">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input05"
                                />
                            </Field>
                            <Field title="Комиссия">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input06"
                                />
                            </Field>
                            <Field title="Общая сумма списания">
                                <Input value={this.state.inputValue}
                                       onChange={this.inputChangeState}
                                       dataId="input07"
                                />
                            </Field>
                        </Fieldset>
                    </Form>
                </Panel>
            </div>
        )
    };

    inputChangeState (value)  {
        this.setState({
            inputValue: value
        });
        console.log(value);
    };
    changeState (index) {
         this.setState({
            value: index
        });
        console.log(index.value);
    }

    switcherButtonChangeState (index)  {
        this.setState({
            selectedItem: index
        });
        console.log(index);
    };
}
<Example />
```