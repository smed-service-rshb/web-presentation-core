# Набор стандартных ui-компонентов презентационного слоя

## Перечень компонентов 

* [Кнопка](./src/button)
* [Иконка-кнопка](./src/icon-button)
* [Подсказка](./src/hint)
* [Переключатель](./src/switcher)
* [Переключатель Toggle](./src/toggle)
* [Простое поле ввода](./src/input)
* [Многострочное поле ввода](./src/textarea)
* [Checkbox](./src/checkbox)
* [Поле для отправки файла](./src/file-upload)
* [Выпадающий список](./src/select)
* [Datepicker](./src/datepicker)
* [InputDatepicker](./src/datepicker-input)
* [Table](./src/table)
* [Tabs](./src/tabs)
* [Панель](./src/panel)
* [Ссылка](./src/link)
* [Fieldset](./src/fieldset)
* [Field](./src/field)
* [Разделитель](./src/divider)
* [Form](./src/form)
* [Предупреждения](./src/notification)
* [Значок-уведомление](./src/badge)
* [Скрываемый блок](./src/collapse)
* [Выпадающее меню](./src/dropdown)
* [Умный поиск](./src/search)
* [Label](./src/label)
* [Выбор периода](./src/filter-period)
* [Аватар](./src/avatar)
* [Прелоадер](./src/preloader)
* [Радиокнопки](./src/radio-button)


## Запуск проекта
* Загрузить зависимости

```sh
    npm i
```
* Выполнить команду запуска сервер разработки [styleguidist](https://react-styleguidist.js.org) (сервис запускается по адресу [http://localhost:6060](http://localhost:6060))

```sh
    npm run styleguide
```

## Перечень дополнитильных команд npm

* `npm run test` - запуск тестов
* `npm run lint` - запуск линтера (утилита проверки code rules)
* `npm run styleguide:build` - генерация документации
* `npm run start-webpack-dev-server` - запуск webpack-dev-server (альтернатива styleguide, который не работает в ie<11)

## Подключение библиотеки
* создать файл `.npmrc` в корне проекта со следующим содержимым:

```properties
    @efr:registry=http://coral:18088/repository/efr-presentation/
```
* выполнить команду:

```sh
    npm i --save-dev @efr/medservice-web-presentation-ui
```
* далее использовать импорт компонентов:

```jsx
    import {Button} from '@efr/medservice-web-presentation-ui';
```

