## Компонент кнопка

Пример использования: Для корректного отображения иконок необходимо использовать иконки, в названиях которых содержится Link. В ином случае корректное отображение не гарантируется.
Использование иконки доступно только для типов secondary и secondaryGray
```

const StandardIcons = require('../index').StandardIcons

Example = () =>(
    <div>
<Button onClick={()=>{alert('Clicked')}} name="Primary" dataId="ButtonId1"/>
<Button onClick={()=>{alert('Clicked')}} name="Primary disabled" disabled={true} dataId="ButtonId2"/>
<br/>
<br/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondary} name="Secondary" dataId="ButtonId3"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondary} disabled={true} name="Secondary disabled" dataId="ButtonId4"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondaryGray} name="SecondaryGray" dataId="ButtonId7"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondaryGray} disabled={true} name="SecondaryGray disabled" dataId="ButtonId8"/>
<br/>
<br/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.special} name="Special" dataId="ButtonId5"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.special} disabled={true} name="Special disabled" dataId="ButtonId6"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.specialOrange} name="specialOrange" dataId="ButtonId11"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.specialOrange} disabled={true} name="specialOrange disabled" dataId="ButtonId12"/>
<br/>
<br/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.additional} name="Additional" dataId="ButtonId9"/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.additional} disabled={true} name="Additional disabled" dataId="ButtonId10"/>
<br/>
<br/>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondary} icon={StandardIcons.refreshLink} dataId="ButtonSettings1" name="Secondary with icon"></Button>
<Button onClick={()=>{alert('Clicked')}} type={Button.buttonTypes.secondaryGray} icon={StandardIcons.addLink} dataId="ButtonSettings1" name="Secondary with icon"></Button>

</div>
);
<Example />
```
