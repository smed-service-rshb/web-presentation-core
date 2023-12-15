## Компонент Fieldset

Ширина по умолчанию 100%. Изменение ширины производить наружним контейнером.

Пример использования:
```

const StandardIcons = require('../index').StandardIcons

class Example extends React.Component  {

    render () {
        return(
            <div>
                <Fieldset title="Поиск клиента" >
                    <div>Любое содержимое</div>
                </Fieldset>
                <br/>
                ПРИМЕР РЕАЛИЗАЦИИ ФОРМЫ:
                <br/>
                <br/>
                <br/>
                <Panel label="Выписка по счету" labelSecondary="Иванова Ульяна Ивановна" dataId="panelForm1">
                    <Fieldset border="dotted">
                        <Field title="заявка №1234" styleTitle="bold" align={Field.aligns.left}>
                            <div>Зарегестрирована 02 дек. 2017</div>
                        </Field>
                        <Field title="Сотрудник" align={Field.aligns.left}>
                            <div>Баринова Ксения Владимировна / Старший специалист отдела 1234567890</div>
                        </Field>
                        <Field title="Подразделение" align={Field.aligns.left}>
                            <div>ДО 03 -234</div>
                        </Field>
                        <Field title="статус" align={Field.aligns.left}>
                            <img src={StandardIcons.tick}/> <span className="green uppercase">Исполнен</span> 8 дек. 2017
                        </Field>
                    </Fieldset>
                    <Fieldset>
                         <Field title="Счет №">1234567 810 901234560020</Field>
                         <Field title="Период">с 12 дек. 2016 по 12 фев, 2017</Field>
                    </Fieldset>
                    <Fieldset subtitle="Документ-основание">
                         <Field title="Операция от 3го лица">Нет</Field>
                    </Fieldset>


                    <br/>
                        ПРИМЕР РЕАЛИЗАЦИИ ДВУХКОЛОНОЧНОЙ СТРУКТУРЫ:
                    <br/>
                    <br/>
                    При columns={2} элементы Field автоматически "разбиваются" на 2 колонки.
                    Остальные компоненты необходимо оборачивать в блок с классом width50.
                    <br/>
                    <br/>
                    <Fieldset title="Реквизиты" columns={2}>
                        <div className="width50">
                            <div className="subtitle uppercase">Данные банка</div>
                        </div>
                        <div className="width50">
                            <div className="subtitle uppercase">Данные о карточном счете</div>
                        </div>
                        <Field title="Наименование банка получателя">
                             <div>ОАО "Россельхозбанк"</div>
                        </Field>
                        <Field title="Валюта счета">
                             <div>Российский рубль</div>
                        </Field>
                        <Field title="ИНН банка получателя">
                             <div>8789787846551</div>
                        </Field>
                       <Field title="Получатель">
                            <div>Иванова Мария Анатольевна</div>
                       </Field>
                        <Field title="Корр.счет банка получателя">
                             <div>8789787846551</div>
                        </Field>
                       <Field title="Номер счета">
                            <div>66545433221212576876545322</div>
                       </Field>
                       <Field title="БИК банка получателя">
                            <div>8789787846551</div>
                       </Field>
                        <Divider type="clear"/>
                       <Field title="КПП банка получателя">
                            <div>8789787846551</div>
                       </Field>
                    </Fieldset>
                </Panel>
                <br/>
            </div>
        )
    };
}
<Example />
```