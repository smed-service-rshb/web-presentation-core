## Компонент ссылка

Для корректного отображения иконок необходимо использовать иконки, в названиях которых содержится `Link`. В ином случае четкость иконок не гарантируется.

Пример использования:
```
const StandardIcons = require('../index').StandardIcons;

    <div>
        <div> Внутри текста <Link onClick={()=>{alert('Clicked')}} dataId="link1">ссылка</Link></div>
        <Link href="http://yandex.ru" target="_blank" dataId="link2">Ссылка на внешний ресурс</Link>
        <br/>
        <Link href="http://yandex.ru" onClick={() => console.log('Clicked')} target="_blank" disabled dataId="link3">
            Неактивная ссылка
        </Link>
        <br/>
        <Link onClick={()=>{alert('Clicked')}} dataId="link4" type="pseudo" href="http://yandex.ru">Псевдо-ссылка</Link>
        <br/>
        <Link onClick={()=>{alert('Clicked')}} dataId="link5" type="external">Ссылка открывающаяся в новом окне</Link>
        <br/><br/>
        Ссылки с иконками:
        <br/>
        <div> Внутри текста - <Link onClick={()=>{alert('Clicked')}} dataId="link6" icon={StandardIcons.refreshLink}>ссылка</Link> с иконкой</div>
        <Link onClick={()=>{alert('Clicked')}} dataId="link6" icon={StandardIcons.addLink} type="additional">Ссылка</Link>

    </div>
```