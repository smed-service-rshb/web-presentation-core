## Раскрываемый блок

Пример использования:
```

const StandardIcons = require('../index').StandardIcons;

class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isOpened2: true,
            isOpened3: false,
            isOpened4: false,
            isOpened5: false,
            isOpened6: false,
            isOpened7: false,
            isOpened8: false
        };
        this.collapseChangeState = this.collapseChangeState.bind(this);
        this.collapseChangeState2 = this.collapseChangeState2.bind(this);
        this.collapseChangeState3 = this.collapseChangeState3.bind(this);
        this.collapseChangeState4 = this.collapseChangeState4.bind(this);
        this.collapseChangeState5 = this.collapseChangeState5.bind(this);
        this.collapseChangeState6 = this.collapseChangeState6.bind(this);
        this.collapseChangeState7 = this.collapseChangeState7.bind(this);
        this.collapseChangeState8 = this.collapseChangeState8.bind(this);
    }

    render () {
        return(
            <div>
                <Collapse onClick={this.collapseChangeState}
                          isOpened={this.state.isOpened}
                          dataId="collapse"
                          openText="Показать другие контакты"
                          hideText="Скрыть другие контакты"
                >
                    Any text
                </Collapse>
                <br/>
                <Collapse onClick={this.collapseChangeState}
                          dataId="collapse3"
                          openText="Неактивный элемент"
                          hideText="Неактивный элемент"
                          disabled
                >
                    Any text
                </Collapse>
                <br/>
                <Collapse onClick={this.collapseChangeState2}
                          isOpened={this.state.isOpened2}
                          dataId="collapse2"
                          openText="Показать дополнительные сведения"
                          hideText="Скрыть дополнительные сведения"
                          type="secondary"
                          rightData="Любой текст"
                >
                    Предустановлено открытое состояние.
                </Collapse>
                <br/>
                Вариант использования для страницы списка продуктов. rightDataWidth должен быть равен 160рх.
                <Collapse onClick={this.collapseChangeState4}
                          isOpened={this.state.isOpened4}
                          dataId="collapse4"
                          openText="Вклады"
                          hideText="Вклады"
                          type="additional"
                          rightData={<Link onClick={()=>{alert('Clicked')}} dataId="link6" icon={StandardIcons.addLink} type="additional">Оформить страховку</Link>}
                          rightDataWidth="160px"
                >
                    Any another text
                </Collapse>
                <Collapse onClick={this.collapseChangeState4}
                          isOpened={this.state.isOpened4}
                          dataId="collapse4"
                          openText="Карты"
                          hideText="Карты"
                          type="additional"
                          rightData={<Link onClick={()=>{alert('Clicked')}} dataId="link6" icon={StandardIcons.addLink} type="additional">Оформить карту</Link>}
                          rightDataWidth="160px"
                >
                    Any another text
                </Collapse>

                <br/>
                    Пример реализации блока Предложения клиенту:
                <br/>
                <br/>
                    При props unclosed компонент раскрывается, но не закрывается.
                <br/><br/>
                <Notification type="notice">
                    <Collapse onClick={this.collapseChangeState5}
                              isOpened={this.state.isOpened5}
                              dataId="collapse5"
                              openText="под 8% на год, срок 260 мес., сумма до 250 000 руб., первоначальный взнос 20%, ежемесячный платеж 15 000 руб."
                              hideText="под 8% на год, срок 260 мес., сумма до 250 000 руб., первоначальный взнос 20%, ежемесячный платеж 15 000 руб."
                              type="suggestion"
                              unclosed
                              leftData={<div className="collapse-subtitle nowrap collapse-item-new">Откройте карту!</div>}
                              rightData={<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.special} name="Оформить" dataId="ButtonId5"/>}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td className="align-top nowrap" width="137px">
                                        <span className="gray">канал:</span> SMS
                                    </td>
                                    <td className="align-top">
                                        <p><span className="gray">срок действия:</span> 23.02.2017 — 08.03.2017 </p>
                                        <p>Уважаемый Иван Иванович! Выпустите карту 8,5% на пол года. За это мы будем Вас всегда любить. C уважением и надеждой, Россельхозбанк. Звоните нам, пожалуйста, по телефону 8-800-100-19-20</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="float-right">
                            <Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondaryGray} name="Клиент отказался" dataId="ButtonId7"/>
                            <Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondary} name="Предложить позднее" dataId="ButtonId3"/>
                        </div>
                        <br/>
                    </Collapse>
                    <Collapse onClick={this.collapseChangeState6}
                              isOpened={this.state.isOpened6}
                              dataId="collapse6"
                              openText="под 8% на год, срок 50 мес., сумма до 250 000 руб., первоначальный взнос 20%, ежемесячный платеж 15 000 руб."
                              hideText="под 8% на год, срок 50 мес., сумма до 250 000 руб., первоначальный взнос 20%, ежемесячный платеж 15 000 руб."
                              type="suggestion"
                              unclosed
                              isOpened
                              leftData={<div className="collapse-subtitle nowrap">Откройте карту!</div>}
                              rightData={<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.special} name="Оформить" dataId="ButtonId5"/>}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td className="align-top nowrap" width="137px">
                                        <span className="gray">канал:</span> SMS
                                    </td>
                                    <td className="align-top">
                                        <p><span className="gray">срок действия:</span> 23.02.2017 — 08.03.2017 </p>
                                        <p>Уважаемый Иван Иванович! Выпустите карту 8,5% на пол года. За это мы будем Вас всегда любить. C уважением и надеждой, Россельхозбанк. Звоните нам, пожалуйста, по телефону 8-800-100-19-20</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="float-right">
                            <Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondaryGray} name="Клиент отказался" dataId="ButtonId7"/>
                            <Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondary} name="Предложить позднее" dataId="ButtonId3"/>
                        </div>
                        <br/>
                    </Collapse>

                    Нет children
                    <br/>
                    <Collapse onClick={this.collapseChangeState8}
                              isOpened={this.state.isOpened8}
                              dataId="collapse8"
                              openText="под 8% на год, срок 50 мес., сумма до 250 000 руб."
                              hideText="под 8% на год, срок 50 мес., сумма до 250 000 руб."
                              type="suggestion"
                              leftData={<div className="collapse-subtitle nowrap">Откройте карту!</div>}
                              rightData={<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.special} name="Оформить" dataId="ButtonId5"/>}
                    />

                    <Collapse onClick={this.collapseChangeState7}
                              isOpened={this.state.isOpened7}
                              dataId="collapse9"
                              openText="Архив"
                              hideText="Архив"
                    >
                        Any text
                    </Collapse>
                </Notification>
            </div>
        )
    };

    collapseChangeState ()  {
        this.setState({
            isOpened: !this.state.isOpened
        },()=>{console.log(this.state.isOpened)});
    };
    collapseChangeState2 ()  {
        this.setState({
            isOpened2: !this.state.isOpened2
        },()=>{console.log(this.state.isOpened2)});
    };
    collapseChangeState3 ()  {
        this.setState({
            isOpened3: !this.state.isOpened3
        },()=>{console.log(this.state.isOpened3)});
    };
    collapseChangeState4 ()  {
        this.setState({
            isOpened4: !this.state.isOpened4
        },()=>{console.log(this.state.isOpened4)});
    };
    collapseChangeState5 ()  {
        this.setState({
            isOpened5: !this.state.isOpened5
        },()=>{console.log(this.state.isOpened5)});
    };
    collapseChangeState6 ()  {
        this.setState({
            isOpened6: !this.state.isOpened6
        },()=>{console.log(this.state.isOpened6)});
    };
    collapseChangeState7 ()  {
        this.setState({
            isOpened7: !this.state.isOpened7
        },()=>{console.log(this.state.isOpened7)});
    };
    collapseChangeState8 ()  {
        this.setState({
            isOpened8: !this.state.isOpened8
        },()=>{console.log(this.state.isOpened8)});
    };
}
<Example />
```