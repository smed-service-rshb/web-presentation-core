## Компонент Divider

Ширина по умолчанию 100%. Изменение ширины производить наружним контейнером.

Пример использования:
```
class Example extends React.Component  {

    render () {
        return(
        <div>
            Простой разделитель
            <br/>
            <br/>
            <Divider/>
            <br/>
            Разделитель между полями Field
            <br/>
            <br/>
            <Divider type="incomplete"/>
            <br/>
            <br/>
            Разделитель с описанием
            <br/>
            <br/>
            <Divider description="и / или"/>
            <br/>
        </div>
        )
    };
}
<Example />
```