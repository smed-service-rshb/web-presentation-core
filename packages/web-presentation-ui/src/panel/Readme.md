## Компонент Panel

Ширина по умолчанию 100%. Изменение ширины производить наружним контейнером.

Пример использования:
```
const StandardIcons = require('../index').StandardIcons;

class Example extends React.Component  {


getHint () {
        return [
            <ul>
                <li>Подсказка 1</li>
                <li>Подсказка 2</li>
            </ul>
        ]
    };

    render () {
        return(
            <div>
                <Panel label="Поиск клиента" dataId="panel1" hint={this.getHint()}>
                    Контент 1
                </Panel>
                <br />
                <Panel label="Поиск клиента" labelSecondary="Иванова Ульяна Ивановна" dataId="panel2">
                    Контент 2
                </Panel>
                <br />
                <Panel labelSecondary="Иванова Ульяна Ивановна" dataId="panel3" rightData={<Link onClick={()=>alert("Продукты")}> ← Продукты</Link>}>
                    Контент 3
                </Panel>
            </div>
        )
    };

}
<Example />
```