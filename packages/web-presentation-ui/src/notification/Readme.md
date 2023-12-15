## Компонент Предупреждение

Пример использования:
```

class Example extends React.Component  {

    constructor(props) {
        this.state = {
            isOpen: true
        }
        this.onClose = this.onClose.bind(this);
    }

    render () {
        return(
            <div>
                <Notification>Информационное сообщение</Notification>
                <Notification type="error">
                    <ul className="list">
                        <li>Ошибка 1</li>
                        <li>Ошибка 2</li>
                        <li>Ошибка 3</li>
                    </ul>
                </Notification>
                <Notification type="notice"><b>Рекламное сообщение</b>, информационное сообщение</Notification>
                <Notification title="Обратите внимание" onClose={this.onClose} isOpen={this.state.isOpen}>
                    <div className="size13">
                        <p>В настоящий момент клиенту недоступно открытие вклада.</p>
                        <div className="margin-bottom-5"><span className="light-gray italic">Причина:</span> Недостаточно данных о клиенте.</div>
                        <div className="margin-bottom-5"><span className="light-gray italic">Для решения проблемы:</span> Необходимо обратиться в головной офис.</div>
                    </div>
                </Notification>
            </div>
        )
    };

    onClose () {
        this.setState({
            isOpen: !this.state.isOpen
        },()=>{console.log(this.state.isOpen)});
    }
}
<Example />
```