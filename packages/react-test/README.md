# Интсрументы для тестирования react компонентов

Пример использования
```jsx
import TestHelper from '@efr/medservice-react-test'

describe('SomeSuite', () => {
    test('SomeText', () => {
        const component = TestHelper.render(<SomeComponent some-pros='some-value'/>);
        expect(component).toBePresent();

        expect(form.find('.some-selector')).not.toBePresent();
    });
})
``` 

## Утилитные расширения jest expect

*  toBePresent - проверить наличие компонента.  
   `expect(component).toBePresent()` - сокращение записи  `expect(component.exists()).toEqual(true)`     
   `expect(component).not.toBePresent()` - сокращение записи  `expect(component.exists()).toEqual(false)` 

*  toBeFocused - проверить в фокусе ли елемент.  