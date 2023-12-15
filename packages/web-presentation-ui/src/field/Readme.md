## Компонент Field

Пример использования:
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
        this.changeState = this.changeState.bind(this);
    }

    getOptions () {
        return [
            {value: '1', label: 'Первый вариант'},
            {value: '2', label: 'Второй вариант'},
            {value: '3', label: 'Третий вариант'}
        ]
    };

    render () {
        return(
            <div>
                <Field title="Документ, подтверждающий назначение владельца счета опекуном или попечителем" hint="Текст подсказки.">
                     <div>Любое содержимое</div>
                </Field>

                <br/>
                <Field title="Поиск клиента">
                     <div>Любое содержимое</div>
                </Field>
                <Field title="Поиск клиента">
                     <div>Любое содержимое</div>
                </Field>
                <Field>
                     <div>Любое содержимое</div>
                </Field>
                <br/>
                <Field title="Поиск клиента" required error="Ошибка валидации поля">
                     <div>Любое содержимое</div>
                </Field>
                <br/>
                <br/>
                <Field type="formField" title="Выберите согласование" hint="Текст подсказки.">
                     <Select options={this.getOptions()}
                         value={this.state.value}
                         onChange={this.changeState}
                         id="selectId"
                         dataId="select1"
                     />
                </Field>
                <br/>
                <Field type="formField" title="Фамилия" required error="Ошибка валидации поля">
                    <Input value={this.state.inputValue}
                        onChange={this.inputChangeState}
                        dataId="input02"
                    />
                </Field>
            </div>
        )
    };

    inputChangeState(value) {
        this.setState({
            inputValue: value
        });
        console.log(value);
    };
    changeState(index) {
         this.setState({
            value: index
        });
        console.log(index.value);
    }
}
<Example />
```