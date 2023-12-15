## Компонент подсказка

Компонент без параметров.

Пример использования:
```

const StandardIcons = require('../index').StandardIcons


Example = () =>(
    <div>
        <Hint>Введите фамилию на кириллице</Hint>
        <Hint name="До 15% годовых">Введите фамилию на кириллице</Hint>
        <Hint name={<img src={StandardIcons.clip} onClick={() => {}} alt=""/>} unDotted>Введите фамилию на кириллице</Hint>
    </div>
);
<Example />
```