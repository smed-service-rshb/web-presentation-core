## Компонент Label

Пример использования:
```
class Example extends React.Component  {
    render () {
        return(
            <div>
                <Label children="Не резидент"/>
                <br/>
                <br/>
                <Label type="primary" children="Резидент"/>
            </div>
        )
    };
}
<Example />
```