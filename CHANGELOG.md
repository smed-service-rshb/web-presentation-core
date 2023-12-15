## 15.0.2-smed (09.08.2022)
- `@efr/medservice-web-presentation-ui`
    - `feature`: Доработка `Select`, добавлена передача `props`

## 15.0.1-smed (09.08.2022)
- `@efr/medservice-web-presentation-ui`
    - `feature`: Перенос доработок из v14.18.0
     
## 15.0.0-smed (08.08.2022)
- Исправлена конфигурация для публикации
- `feature` Переименовывание пакетов

## 14.0.2 ()
- `@efr/medservice-web-presentation-ui`
    - `(bugfix)` BUG125686: [UX] Некорректное отображение длинных значений (Правка, чтобы строка не убагала, если значение не помещается в 1 строку)
- `@efr/medservice-web-presentation-utils-test`
    - `(bugfix)` Правка теста зависимостей 

## 14.0.1 (21.09.2019)
- `@efr/medservice-web-presentation-ui`
    - `(bugfix)` BUG124968: [UX] Реализовать отступы в заголовках заявок в соответствии с макетом (Корректировка стилей для карточки статуса операции у компонента fieldset)
    - `(bugfix)` BUG124883: [UX] Добавить отступы между полями ввода в операциях (Корректировка стилей, избавление от струкуры с таблицами)

## 14.0.0 (17.09.2018)

- Переход на react 16.5.0
- Выделены модули `@efr/medservice-transpiler-dependencies` и `@efr/medservice-react-dependencies`
- `@efr/medservice-react-test`
  - Добавлен матчер toBeFocused

- `@efr/medservice-web-presentation-ui`
    - `(feature)` Добавление нелагающей анимации прелоадера
- `@efr/medservice-web-presentation-core`
    - (bugfix) BUG125198: [UX] ИЕ10. При уменьшении масштаба боковое меню съезжает вверх (Решено через изменение отступов)

## 13.0.0 (05.09.2018)
- `@efr/medservice-web-presentation-core`
    - `(feature)` Добавлена поддержка дополнительных пунктов меню, полученных для сотрудника.
    - `(feature)` Реализован учет заголовка `x-efr-session-marker`, если он меняется, происходит перезапрос сессии.    
- `@efr/medservice-web-presentation-utils-mock`
    - `(feature)` Предоставляется функция `addBehavior`, позволяющая делать централизованную предобработку запросов и ответов заглушки.
    - `(feature)` В обработчиках заглушки добавлен доп параметр response 

## 12.8.2 (14.09.2018)
- `@efr/medservice-web-presentation-core`
     - `(feature)` CHG124728: [UX] Изменения в верстке на форме "Анкета клиента". CHG124688: [UX] Изменения в верстке (Правка отступов, выравнивание верхнего меню по ширине контента)
     - `(feature)` Изменение кнопки-ссылки на добавление продукта (согласно макетам)

## 12.8.1 (03.09.2018)
- `@efr/medservice-web-presentation-core`
    - `(bugfix)` Поправлены стили для формы поиска клиентов

## 12.8.0 (03.09.2018)
- `@efr/medservice-web-presentation-core`
    - `(feature)` CHG124629: Объединение в продуктовом профиле карточных счетов и карт (Изменена верстка согласно макету в запросе,а также новым требованиям от банка)

## 12.7.0 (30.08.2018)
- `@efr/medservice-web-presentation-ui`
    - `(feature)` Для компонента [Avatar](./packages/web-presentation-ui/src/avatar/Avatar.jsx) доработано использование IFrame с признаком `editable`.
- `@efr/medservice-web-presentation-ui`
    - `(feature)` CHG124688: Изменения в верстке (Добавления параметра "тип" для компонента полей, написание структуры и стилей под новый тип, изменение картинки у компонента "hint" , изменение стиля заголовка у компонета "panel")
    - `(feature)` CHG124728: Изменения в верстке на форме "Анкета клиента". (Изменены стили в некоторых компонентах)

## 12.6.0 (29.08.2018)
- `@efr/medservice-web-presentation-ui`
    - `(feature)` Для компонента [Avatar](./packages/web-presentation-ui/src/avatar/Avatar.jsx) добавлена возможность использование IFrame. 

## 12.5.0 (28.08.2018)
- `@efr/medservice-web-presentation-core`
    - `(feature)` CHG124349: Анкета. Просмотр. Изменение в шапке формы. (Изменение общего контейнера под фиксированную ширину, изменения вида компонентов(кнопок,лейблов и пр) согласно макетам в запросе)
    - `(feature)` CHG124629: Объединение в продуктовом профиле карточных счетов и карт (Исправлена часть верстки по макету в запросе, переработано верхнее меню, левое меню, изменен внешний вид выпадающего списка согласно макету в запросе)
- `@efr/medservice-web-presentation-utils-dev`  
    - `(feature)` Добавлена поддержка отдачи сервером express статических файлов из подкаталогов папки static-express-files. 
    - `(feature)` Если заданы переменные окружения DBO_HOST и DBO_PORT,  при старте девелоперского сервера создается прокси `/ib6 -> http://DBO_HOST:DBO_PORT/ib6`. 
- `@efr/medservice-web-presentation-utils-mock`
    - `(feature)` В registerMock добавлен опциональный параметр basePath, в котором можно задать префикс путей заглушек (по умолчанию используется переменная EFR_BACKEND_BASE_PATH)
     
## 12.4.0 (24.08.2018)
- `@efr/medservice-web-presentation-ui`
   - `(feature)`Реализован компонет [BlockPreloader](./packages/web-presentation-ui/src/preloader/BlockPreloader.jsx).

## 12.3.0 (21.08.2018)
- `@efr/medservice-web-presentation-utils-dev`  
  - Для проксирования запросов на бекенд используется оригинальный EFR_BACKEND_BASE_PATH вместо /backend-proxy

## 12.2.0 (17.08.2018)
 - Добавлен признак задизабленности компоненту Tab

## 12.1.0 (08.08.2018)
- `@efr/medservice-web-presentation-core`
   - `(bugfix)` BUG123834: Обрезается картинка загрузки (Доработка запроса, внесение правок в стили)
- `@efr/medservice-web-presentation-ui`
   - `(feature)` Изменен стиль компонента [FileUpload.IFrame]
   - `(feature)` Для компонента [FileDownload](./packages/web-presentation-ui/src/file-download/FileDownload.jsx) добавлен параметр disabled - признак заблокированного элемента.

## 12.0.1 (03.08.2018)
 - исправлена ошибка проксирования запросов в девелоперском приложении при пустом EFR_BACKEND_BASE_PATH

## 12.0.0 (02.08.2018)
- Поправлены ошибки сборки в продакшен режиме
- `@efr/medservice-web-presentation-core`
   - `(bugfix)` BUG123834: Обрезается картинка загрузки (Изменена картинка прелоадера)
- `@efr/medservice-web-presentation-utils-dev`  
  команды `start-dev-app` и `build-dev-app` принимают опциональные параметры
     - webpackconfig - конфиг webpack [пример](./packages/web-presentation-module-test/package.json).
     - publicpath - путь, по которому доступна презентация(по умолчению - /efr/)

## 11.1.0 (31.07.2018)
- `@efr/medservice-react-test`
    - `(feature)` Добавлена команда запуска тестов `run-tests` (см. [пример](./packages/web-presentation-module-test/package.json)).
    Для корректного ее использования необходимо
        - добавить явную зависимость (если ее нет) от `@efr/medservice-react-test` в `package.json`
        - в `package.json` скрипт `"test": "jest --env=jsdom"` заменить на `"test": "run-tests"`
        - удалить блок `jest` в `package.json`
        - удалить файл `setup-jasmine-env.js`.
- `@efr/medservice-web-presentation-core`
    - `(feature)` Добавлена централизованная обработка ошибки 401 ([BUG116900](http://trk.softlab.ru/tmtrack/tmtrack.dll?IssuePage&RecordId=119853&Template=view&TableId=1023)).
    - `(bugfix)` BUG122764: [IE9][UX] Некорректное отображение всплывающих окон (добавление вендорного префикса для корректной работы transform в ie9)
    - `(bugfix)` BUG122449: [UX] Выровнять поля в блоке заголовка на форме статуса всех заявок (добалвение ширины загловку блока-статуса операции, согласно требованиям в запросе)

## 11.0.0 (11.07.2018)
- `@efr/medservice-web-presentation-core`
  - `(breaking change)` В описании пунктов меню параметр `modes` заменен на `mode`, тип изменен с массива на строку.
  - `(breaking change)` Удален первый параметр (режимы) конструктора лейаута.
  - `(feature)` Добавлена возможность указания функции (от текущей страницы) в качестве зависимости (`related`) для пункта меню.
  - `(feature)` Добавлен предопределенный лейаут `AllPagePropsMenuDataLayout` -- использующий в качестве параметров меню все параметры страницы.
  - `(feature)` Добавлен предопределенный лейаут `ManuallySetupMenuDataLayout` -- заполняющий параметры меню только по явному вызову `setLayoutData`.

## 10.2.0(29.06.2018)
- `@efr/medservice-web-presentation-core`
  - `(feature)` Для `pageRouter` добавлена возможность открывать страницу в новой вкладке: метод `openNewTab`. Первые два параметра передаются как и при обычном открытии страницы, а в качестве тертьего необязательного параметра можно передать имя окна.
  -  Пометка страниц отключена для браузеров, не поддерживающих History API. (BUG122520: [IE9] Релизовать возможность инициировать операции в IE9)
  - `(bugfix)` BUG117473: [Клиенты][Анкета][UX] Создание/редактирование. Замечания к полю "Адрес" (Удален отступ у выделенного поля, согласно требованиям в запросе по поводу поля "Адрес")
  - `(bugfix)` CHG120878: [Компоненты][UX] Привести к макету отображение сообщения об ошибках (смещение маркера, увеличение отступа у списка)

## 10.1.0(22.06.2018)
- `@efr/medservice-web-presentation-ui`
  - В [Grid](./packages/web-presentation-ui/src/grid/Grid.md) добавлена возможность кастомной отрисовки содержимого ячейки.  
- `@efr/medservice-web-presentation-utils-dev`
  - При сборке приложения создается файл с версиями зависимостей `versions-info.txt`.

## 10.0.0(18.06.2018)
- Обновлен `jest` до версии `23.1.0`.
- Обновлен `express` до версии `4.16.3`.
- Обновлен `superagent` до версии `3.8.3`.
- `@efr/medservice-web-presentation-utils-dev`
    - `(feature)` Запросы к бекенду проксируются через вебсервер презентации для ухода от CORS.      
- `@efr/medservice-web-presentation-utils-mock`
    -  Удалена поддержка CORS.
- `@efr/medservice-web-presentation-ui`
    - `(breaking change)` Компонент `Field` больше не устанавливает автоматически свойство error дочерним элементам. Свойство необходимо устанавливать самостоятельно.

        _было_
        ```javascript
        
        <Field title={title} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange}/>
        </Field>
        ```

        _стало_
        ```javascript
        
        <Field title={title} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}/>
        </Field>
        ```
    -  Удален preview. Для тестирования компонентов в браузере необходимо использовать модуль @efr/medservice-web-presentation-module-test.
    - `(feature)` BUG121994: [Клиенты][Анкета] Если паспорт РФ не разрешать выбор значения из календаря для поля "Дата окончания" (доработка компонента InputDatepicker, дополнительная проверка параметра disable при вызове календаря)
    - `(feature)` BUG121385: [Переводы][UX] Исправить замечания по отображению формы параметров перевода (добавление нового типа компоненту switcher для удобного расположения списка radiobutton один под другим)
    - `(feature)` Реализован компонет [FileUpload.IFrame](./packages/web-presentation-ui/src/file-upload/FileUploadIFrame.jsx) загрузки файла через iframe для поддержки IE9.
    - `(feature)` Реализован компонет [FileDownload](./packages/web-presentation-ui/src/file-download/FileDownload.jsx).
- `@efr/medservice-web-presentation-core`
    - `(feature)` HOC `withActions` добавляет дополнительный props `restClientSettings`, содержащий настройки подключения к backend.
    - `(feature)` HOC `withActions` добавляет дополнительный props `buildBackendUrl`.

## 9.0.2(07.06.2018)
- `@efr/medservice-web-presentation-utils-dev`
    -  Ошибки конфигурирования зависимостей выводятся в консоль, а не роняют приложение.

## 9.0.1(04.06.2018)
- `@efr/medservice-web-presentation-core`
    - `(bugfix)` BUG121908: [Компоненты] Не отображается прелоадер при загрузке данных и форм.

- `@efr/medservice-web-presentation-ui`
    - `(bugfix)` BUG117473: [Клиенты][Анкета][UX] Создание/редактирование. Замечания к полю "Адрес" (выравнивание текста по высоте обертки)
    - `(bugfix)` CHG120878: [Компоненты][UX] Привести к макету отображение сообщения об ошибках (Добавление необходимого класса для списка, удаление ":" у заголовка)
    - `(feature)` BUG121159: [Продукты][UX] Не подсвечиваются ссылки на открытие продукта при наведении курсора (Изменение подключения иконки, теперь она передается на фон, а не в тег `<img>`. Сделано для удобства использования события hover. Добавление ховера, согласно условиям в запросе)
    - `(bugfix)` BUG121584: [Перевод в другой Банк][Валютный][UX] Не обрезать подсказку к полю “Детали расходов” при изменении размеров окна браузера (ограничене ширины подсказки)
    - `(bugfix)` BUG121793: [UX] Исправить отображение главного (горизонтального) меню, если пункты не поместились в одну строку (Добавлено ограниченние по ширине контейнера с пунктами меню, теперь при измении размера окна пункты меню будут перестраиваться. Добавление отступов для пунктов меню.)

## 9.0.0(15.05.2018)
- `@efr/medservice-web-presentation-module-bpm`
    - `(breaking change)` модуль переехал в проект http://git.dos.softlab.ru/RSHB/EFR/presentation/bpm-presentation
- `@efr/medservice-web-presentation-core`
    - `(feature)` HOC `withActions` добавляет дополнительный props `getAction`, который позволяет получить экшен в рантайме.
    - `(bugfix)` Исправлена ошибка при использовании вложенных HOC `withActions`.
- `@efr/medservice-web-presentation-utils-dev`
    - `(breaking change)` Утилита тестирования зависимостей PBM `WithExternalBPMDependency` переехала в новый выделенный модуль `@efr/medservice-web-presentation-module-bpm-dev`
    проекта http://git.dos.softlab.ru/RSHB/EFR/presentation/bpm-presentation 
- `@efr/medservice-web-presentation-ui`
    - `(feature)` Доработан компонент `Label`: добавлен параметр type. (BUG120334: [Клиенты][Анкета] На форме просмотра отображение поля "Резидент" не соответствует макету)
    - `(feature)` Изменено использование `setState()` в `withFormData`.
    - `(bugfix)` BUG119975: [Клиенты][Анкета] Замечания по отображению списка адресов (Изменение отступа)

## 8.0.0 (07.05.2018)
- `@efr/medservice-web-presentation-core`
    - `(breaking change)` В withFormData errors - объект, содержащий функции для вывода ошибок:
        - `list`: функция возвращающая список ошибок (без повторений) полей и формы типа - string;
        - `formErrors`: функция возвращающая список ошибок формы типа - string.
    - `(feature)` При валидации формы (поля), проставляется тип ошибки `validateForm` (`validateField`) в данные поля.
- `@efr/medservice-web-presentation-ui`    
    - `(feature)` Добавлены props `onInputFocusChange` и `error` для компонента InputDatepicker, при наличии `error=true` стиль компонента Input меняется.
    - `(feature)` Удалено использование IconButton.
    - `(bugfix)` BUG120861: [Открытие вклада][UX] Замечания по дизайну на формах открытия вклада (Изменение ширины заголовка поля согласно макету (\Открытие вклада\02.psd))
    - `(bugfix)` BUG119899: [Продукты][UX] Замечания к дизайну страницы продуктового профиля (Изменение отображения ссылки — как блок, а не текст)
    - `(bugfix)` CHG120878: [Компоненты][UX] Привести к макету отображение сообщения об ошибках (Изменение стилей у оповещения с ошибкой)
    - `(bugfix)` BUG120136: [Продукты][UX] Некорректное отображение списка операций по продукту (Внесение правки: уменьшение отступа между списком и кнопкой)

## 7.3.0 (27.04.2018)
- `@efr/medservice-web-presentation-ui`
    - `(bugfix)` BUG117107: [Клиенты][UX] Некорректно отображается загруженное фото клиента (Изменение механизма подключения картинки, теперь картинка передается на фон, а не элементом `<img>`)
    - `(bugfix)` BUG120136: [Продукты][UX] Некорректное отображение списка операций по продукту (Смещение выпадающего списка)
    - `(bugfix)` BUG120396: [Продукты][UX] Корректно отображать список операций по продуктам (переопределение праметра)
    - `(bugfix)` ENH120758: [Продукты] Изменить область кликабельности элемента сворачивания блока продуктов (удаление лишних стилей)
- `@efr/medservice-web-presentation-module-bpm`
    - `(feature)` Возможность вернуться на страницу, с которой был запущен процесс.
    - `(feature)` Возможность указать дефолтную страницу на которую возвращаться, если нет возможности определить откуда процес был запущен (другая сессия или вкладка)

## 7.2.0 (20.04.2018)
- `@efr/medservice-web-presentation-ui`
    - `(feature)` добавлен dataId для компонента switcher, для кастомизации data-id элементов (dataId приписывается к item.id)
    - `(feature)` добавлен colSpan для компонентов TableRowHeader и TableRowColumn
    - `(feature)` Доработка компонента dropdown. Добавлен параметр type.
    - `(feature)` добавлена `closeMenu` для компонента Search
    - `(feature)` Заголовки в таблице переведены в верхний регистр
    - `(bugfix)` BUG120035: [Клиенты][Анкета][UX] Убрать обводку поля при выборе значения в поле "Адрес"(убрана обводка при фокусе, доработан ховер-эффект для выпадающего списка)
    - `(bugfix)` BUG120122: [Клиенты][UX] Некорректно отображаются всплывающие окна с сообщениями (убран верхний бордер у контейнера с кнопками согласно макету в запросе)
    - `(bugfix)` BUG120552: [Клиенты][Анкета][UX] Выровнять радиокнопки в подблоках "Адрес фактического проживания" и "Почтовый адрес" 
    - `(bugfix)` BUG120004: [Клиенты][Анкета][UX] Замечания по отображению подблока «Согласие на хранение, обработку и передачу персональных данных»
      
## 7.1.0 (06.04.2018)
- `@efr/medservice-web-presentation-core`
    - `(feature)` Для форм добавлена возможность в обработчиках валидировать поле: метод `validate`
    - `(feature)` Для форм добавлена возможность в обработчиках очищать ошибки поля: метод `clearError`
    - `(feature)` Для форм добавлена возможность в обработчиках очищать ошибки других полей: метод `clearFieldError`        
    - `(bugfix)` BUG120127: [Клиенты][Анкета][UX] Невозможно закрыть календарь
- `@efr/medservice-web-presentation-module-bpm`
    - `(bugfix)` BUG120250: [Клиенты] Некорректная работа системы при попытке выйти из приложения с формы заявки
- `@efr/medservice-web-presentation-utils-dev`
    - `(feature)` Генерация предупреждений для страниц с безусловной доступностью.

## 7.0.0 (21.03.2018)
- `@efr/medservice-web-presentation-core`
    - `(breaking change)` переработан механизм работы с правами доступа (проверяются бизнесс-права вместо разрешений конечных сервисов)
    - `(breaking change)` удалена поддержка свойства `availability` у модальных окон
    - в `authContext` добавлен признак `authenticated`
    - Доработано отображение Modal
- `@efr/medservice-web-presentation-ui`
    - `(breaking change)` Доработан компонент Tabs: компонент теперь без состояния. Состоянием должен управлять вызывающий код через свойства `selected` и `onChange`.
    - `(breaking change)` Удален компонент IconButton
    - Доработан компонент Notification: добавлены props title, onClose, isOpen
    - Доработаны стили компонентов Notification, Field
    - Доработаны стили компонентов Hint, Button, Link, Avatar, Textarea, Field
    - Доработан компонент Grid: удалена автоматически добавляемая кнопка "Обновить", доработан пример работы с панелью кнопок
    - Доработаны стили компонента Tabs
    - Доработаны компонент Hint: добавлен props unDotted
    - Доработан компонент Button: добавлена возможность использовать иконку у кнопок
    - Изменение отображения по нажатию мыши на элементы Button, Checkbox, Dropdown, RadioButton, Switcher, Tabs, Toggle, Link
    - Добавлен стандартный стить list для отображения списков
- `@efr/medservice-web-presentation-utils-test`
    - `(breaking change)` в приложении для тестов (`import {createTestApp} from '@efr/medservice-web-presentation-utils-test'`) метод `withPermissions` заменен на `withRights`, в качества парметра набор прав, используемых в тестируемом компоненте

## 6.0.1 (13.02.2018)
- `@efr/medservice-web-presentation-utils-dev`
    - Убрана необходимость указания зависимости от страниц, открываемых только через пункты меню

## 6.0.0 (12.02.2018)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Button. Добавлен тип secondaryGray. Заменен тип extra на specialOrange. Доработаны стили.
    - Исправлена ошибка при смене свойства mask у Input
    - Доработан компонент Collapse. Добавлен тип suggestion. Доработаны стили. Добавлен props unclosed.
    - Доработан компонент Fieldset. Добавлен props columns для реализации двухколоночной структуры Field
    - Доработаны общие стили. Добавлены классы: .width50, .width33, .subtitle
    - Доработаны стили для Field, Fieldset, Modal

- `@efr/medservice-web-presentation-core`
    - Убран заголовок EFR-Authorization, который передавался в каждом запросе
    - Добавлена возможность не отображать прелоадер для конкретного запроса
    - Добавлено обязательное поле dataId для меню навигации.
    - Перенос определения лейаута из описания страницы (`layout: () => layouts.EMPTY`) в описание корневого компонента страницы

        _MyComponent.jsx:_

        ```javascript
        ...
        import {layouts} from "@efr/medservice-web-presentation-core";
        ...
        export default compose(
           layouts.EMPTY,
           ...
        )(MyComponent),
        ```
> - Описание лейаута должно создаваться через функцию `Layout` пакета `layouts`.
> - Лейаут должен быть корневым компонентом страницы, иначе используется лейаут по умолчанию.

    - Добавлена возможность блокирования пунктов меню
    - Добавлена возможность динамического меню, через функцию [`CustomModeLayout`](/packages/web-presentation-core/src/layout/README.md) пакета `layouts`.

- `@efr/medservice-web-presentation-utils-dev`
    - Перенесена страница логина в `@efr/medservice-web-presentation-module-test`. Теперь 
    в проектах не будет работать `import {createMockLoginModule} from 
    @efr/medservice-web-presentation-utils-dev'` и `import createLoginModuleMock from 
    '@efr/medservice-web-presentation-utils-dev/mocks.config'`, нужно подключать 
    `@efr/medservice-web-presentation-authentification` и использовать его.
    
    Пример подключения `@efr/medservice-web-presentation-authentification` http://git.dos.softlab.ru/RSHB/EFR/presentation/deposit-management-presentation

    - Добавлена проверка зависимостей модуля от ресурсов (экшены и модальные окна)
        - При старте тестового приложения определяется:
            - наличие тестируемого модуля (модуль с объявленными зависимостями)
            - доступность ресурсов, объявленных в зависимостях тестируемого модуля, в запускаемой конфигурации
        - При работе тестового приложения запрещается доступ к ресурсам, не объявленным в зависимостях

        Пример [определения зависимостей](/packages/web-presentation-module-test/dev.app.config.js).

- `@efr/medservice-web-presentation-utils-mock`
    - Добавлена возможность регистрации массива заглушек через `registerMock`.

- `@efr/medservice-web-presentation-module-bpm`
    - Изменено апи билдера заглушки для bpm (`@efr/medservice-web-presentation-module-bpm/mocks.config`):
    регистарация собираемой заглушки должна проходить через `registerMock`.

        Например: `registerMock(bpmModuleMockConfig("/deposit", "deposit-transaction", buildProcessDefinition));`.

- `@efr/medservice-web-presentation-utils-test`
    - Добавлен тест проверки зависимостей модуля от ресурсов (экшены и модальные окна) `checkDefinition`, проверяющий
        - наличие тестируемого модуля (модуль с объявленными зависимостями)
        - доступность ресурсов, объявленных в зависимостях тестируемого модуля, в тестируемой конфигурации

        Пример [теста](/packages/web-presentation-module-test/src/definition.test.js).

## 5.3.0 (17.01.2018)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Collapse. Добавлен тип additional. Доработаны стили.
    - Доработан компонент Link. Добавлен тип additional. Добавлена возможность использовать иконки через props icon.
    - Доработаны стандартные стили.
    - Исправлена ошибка при изменении props для компонента Input.
-  `@efr/medservice-web-presentation-core`
    - Добавлен валидатор typeDate для проверки является ли поле датой
    - Добавлен валидатор sameDate для проверки равна ли дата заданной
    - Добавлен валидатор minDate для проверки меньше ли дата заданной
    - Добавлен валидатор maxDate для проверки больше ли дата заданной

## 5.2.0 (15.01.2018)
- `@efr/medservice-web-presentation-ui`
    - Добавлены маски к инпутам.
    - Доработан InputDatepicker. Исправлено закрытие.

## 5.1.0 (12.01.2018)
- `@efr/medservice-web-presentation-ui`
    - Добавлены стандартные иконки, добавлен стандартный класс .nowrap
    - Доработаны стили для компонента Dropdown
    - Доработан компонент Collapse. Заменена используемая библиотека.
    - Доработаны стили для компонента Link и общие стили

## 5.0.0 (25.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Divider. Для параметра type удалено значение full
    - Доработаны стили компонента Tabs
- `@efr/medservice-web-presentation-core`
    - Доработаны стили компонентов Modal, Datepicker
    - Добавлена поддержка дополнительных http-статусов для обработки через `responseStatusHandler`

## 4.0.0 (20.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Fieldset. Удалено отображение разделителя между компонентами. Для разделения блоков теперь используем Divider
    - Изменена верстка. Для корректного отображения контента на каждой странице необходимо использовать Panel.
    - Доработан компонент Divider. Для параметра type добавлено значение full
    - Доработаны стили компонентов Field, Form
    - Доработан компонент Modal. Предустановленный размер окна 500рх. При необходимости увеличить ширину окна до 600рх необходимо контент обернуть в блок с классом "popup-content-width-600"
- `@efr/medservice-web-presentation-core`
    - исправлена ошибка в случае, если поле без валидаторов добавлено в форму валидации
- `@efr/medservice-web-presentation-module-bpm`
    - получение переменных контекста через `this.props.bpmContext[VARIABLE_NAME]`

## 3.1.0 (18.12.2017)
- `@efr/medservice-eslint-config-react`
    - Добавлен eslint-loader в зависимости
- `@efr/medservice-web-presentation-utils-dev`
    - Удален eslint-loader из зависимостей
- `@efr/medservice-web-presentation-core`
    - Для форм добавлена возможность в обработчиках поля менять значение других полей: метод `setFieldValue`
    - Название метода для изменения значения поля заменено на `setValue`. Старое значение `onChange` оставлено для совместимости, но не рекомендуется к использованию

## 3.0.0 (18.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Panel. Добавлен props hint для отображения подсказки
    - Доработаны стили для Button, Switcher
- `@efr/medservice-web-presentation-utils-mock`
    - Заглушка регистрирует внешние зависимости нетранзитивно

## 2.0.0 (14.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработан компонент Switcher. Добавлены props disabled, unSelectable. По умолчанию первый элемент не выбирается в случае отсутствия selected
    - Доработаны стили компонента RadioButton
    - Доработан компонент Button. Добавлен обработчик onKeyPress

## 1.3.1 (13.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработаны компоненты Hint, Table. Исправлена ошибка обрезания Hint внутри Table

## 1.3.0 (11.12.2017)
- `@efr/medservice-web-presentation-core`
    - Добавлен валидатор typeNumeric для числовых поля
    - Добавлен валидатор rangeNumeric для проверки вхождения в диапазон числового поля

## 1.2.0 (8.12.2017)
- `@efr/medservice-web-presentation-ui`
    - Доработаны стили компонента Search, Grid, FileUpload, Button
    - Доработан компонент Switcher: добавлены типы secondary, radio
    - Реализован компонент RadioButton
    - Доработан компонент Fieldset: добавлен признак border
    - Доработан компонент Field: добавлен признак align
    - Доработан компонент Form: добавлена возможность вывода информационных сообщений
    - Доработан компонент Switcher: для типа radio добавлен tabIndex="-1"
    - Доработан стиль компонента Button
    - Изменения компонента Search. Добавлены пропсы multi, cache. Версия react-select заменена на актуальную. Добавлен кастомный рендер элементов списка.

## 1.1.2 (29.11.2017)
- `@efr/medservice-web-presentation-core`
    - Исправлена проблема с Preloader (в запросе не проставлялись параметры)
    
## 1.1.1 (28.11.2017)
- `@efr/medservice-web-presentation-core`
    - Доработана разметка сетки. Подвал прижат книзу
    - Доработан компонент SubMenu
    - Исправлена проблема с Preloader
- `@efr/medservice-web-presentation-ui`
    - Доработаны стили компонентов Search, Tabs, Grid, Table
    - Доработан компонент PreloaderProvider для улучшения разметки сетки
    - Доработаны стили компонента PreloaderProvider
    - Доработаны стили компонента Datepicker
    - Доработан Input, убран тип number из-за нестабильной работы
    - Доработан компонент Field. Удалено использование двоеточия.

## 1.1.0 (21.11.2017)
- `@efr/medservice-web-presentation-core`
  - Доработано отображение иерархичного меню   
  - Реализован вызов прелоадера при аjax запросах.
  - Добавлена возможность уставновки tabIndex для компонентов.
- `@efr/medservice-web-presentation-ui`
  - Добавлен `Preloader` (самостоятельный вызов возможен через `withPreloader`)
  - Добавлены стандартные иконки
  - Доработаны стили  компонента Preloader
- выделен модуль [@efr/medservice-web-presentation-module-bpm](/packages/web-presentation-module-bpm/README.md):
  - Пример [компонентов пользовательских задач](/packages/web-presentation-module-test/src/components/bpm) доступен в тестовом приложении.  
  - Пример конфигурирования [заглушки](/packages/web-presentation-module-test/mocks.config.js) (buildProcessDefinition) доступен в тестовом приложении.
- выделен модуль [@efr/medservice-docker](/packages/docker/README.md)

## 1.0.3 (25.10.2017)
- `@efr/medservice-web-presentation-utils-dev`
  - Поддержка работы приложения в ie.
  
## 1.0.2 (25.10.2017)
- `@efr/medservice-web-presentation-utils-dev`
  - В скрипт build-dev-app добавлен аргумент main.

## 1.0.1 (24.10.2017)
- `@efr/medservice-web-presentation-core`
  - RestClient: поддержка credentials в запросах к серверу
- `@efr/medservice-web-presentation-utils-mock`
  - Доработана заглушка. Добавлены заголовки (Access-Control-Allow-Credentials, Access-Control-Allow-Origin) к ответу для корректной работы CORS.
- `@efr/medservice-web-presentation-utils-dev`
  - Добавлена возможность запускать app с аргументом (в котором указывается файл, из которго запускать app)

## 1.0.1-0 (06.10.2017)
- `@efr/medservice-web-presentation-utils-mock`
  - Реализована поддержка внешних зависимостей в конфигурации заглушек. [Пример](/packages/web-presentation-module-test/mocks.config.js) доступен в тестовом приложении.
- `@efr/medservice-eslint-config-react`
  - Исправлены переносы строк для закуска утилиты под linux
- `@efr/medservice-web-presentation-utils-dev`
  - Исправлены переносы строк для закуска утилит под linux
  
## 1.0.0 (05.10.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Доработан Modal: добавлена кнопка закрытия окна
  - Исправлена ошибка, появившаяся в версии 0.0.6 (при отсутствии инициализации данных не отрабатывала валидация).
  - Доработано тестовое приложение: реализовано редактирование и создание сущностей, подключена заглушка на редактирование и создание, дабавлена кнопка "создать" в список сущностей.
  - Изменилась конфигурация девелоперского приложения: Вместо `rest-settings.json` необходимо использовать файл [app.config.js](/packages/web-presentation-module-test/__dev__/app.config.js).
  - доработан pageRouter - обавлена возможность ставить метки на страницы и возвращаться к ним. В тестовое приложение добавлены страницы "список платежей" и "анкета клиента" для
    иллюстрации работы меток. Добавлены тесты новых методов.
  - Доработан роутер: поддерживаются query string параметры.
- `@efr/medservice-web-presentation-ui`
  - Пакет переименован в `@efr/medservice-web-presentation-ui`. Необходиом изменить импорты.
  - Доработан `Table`: удален тип secondary, добавлены признаки активного элемента, выравнивания данных в ячейках и ширины таблицы.
  - Добавлен компонент выбора периода `FilterPeriod`
  - Доработка дизайна компонента `Divider`. Добавлены типы компонента: `default`, `incomplete`, `clear`. Признак `clear` вынесен в тип.
  - Доработан компонент `Datepicker`: удалена возможность добавления кнопок в компонент.
  - Доработан компонент `Tabs`: добавлены типы.
  - Доработан компонент `Switcher`: удалено использование типов.
  - Доработан компонент `Grid`: удалено использование `IconButton`, добавлено использование `Link`.
  - Внедрен стилизованный `scrollbar` в компоненты: `Table`, `Search`, `Select`.
  - Добавлен компонент `Avatar`.
  - Доработан компонент `Panel`: добавлен второй тип заголовка `labelSecondary`.
  - Доработан компонент `Grid`: добавлена возможность задать максимальную высоту.
- выделен в отдельный модуль [@efr/medservice-web-presentation-utils-mock](/packages/web-presentation-utils-mock/README.md).
  Необходиом изменить импорты и внести изменения в конфигурацию заглушки (Пример конфигурации заглушки - [mocks.config.js](/packages/web-presentation-module-test/mocks.config.js),
  файл `src\__dev__\mocks.js` нужно удалить.
- выделен в отдельный модуль [@efr/medservice-web-presentation-utils-test](/packages/web-presentation-utils-test/README.md).
  Необходиом изменить импорты с `@efr/medservice-web-presentation-core/test-utils` на `@efr/medservice-web-presentation-utils-test`.
- выделен в отдельный модуль [@efr/medservice-web-presentation-utils-dev](/packages/web-presentation-utils-dev/README.md).
  Необходимо изменить конфигурацию девелоперского приложения. Директорию `src\__dev__` можно удалить,
  перенеся в файл `dev.app.config.js` описания модулей и навигации. 
- выделен модуль [@efr/medservice-react-test](/packages/react-test/README.md).
- выделен модуль [@efr/medservice-eslint-config-react](/packages/eslint-config-react/README.md).

## 0.0.6 (08.09.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Исправлена ошибка валидаторов. Ошибки предыдущей валидации должны чиститься.
  - Исправлена ошибка вызова обработчика закрытия модального окна при использовании ассинхронного кода.
  - Обновлены зависимости:
    - `@efr/medservice-web-presentation-ui-components` 0.0.6
- `@efr/medservice-web-presentation-ui-components`
  - Доработан `Input`: поддержка числовых значений в `value`.
  - Доработан `Field`: добавлена проверка на пустоту `title`.
  - Добавлен файл `.css` с общими стилями
  - Доработан компонент `Button`: добавлен тип кнопки `extra`.
  - Доработан компонент `FileUpload`. Добавлены props: `name`, `disabled`.
  - Реализован компонент `Search`.
  - Доработан компонент `Hint`: добавлен props `name`.

## 0.0.5 (25.08.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Реализована проверка прав с учетом сервиса. При использовании `createMockLoginModule` необходимо передавать вторым параметром имя сервиса. [Пример](/packages/web-presentation-module-test/src/__dev__/modules.js)  
  - Обновлены зависимости:
    - `@efr/medservice-web-presentation-ui-components` 0.0.5
- `@efr/medservice-web-presentation-ui-components`
  - Доработан компонент `Field`: добавлен props selected для управления выделением поля.
  - Добавлен компонент `Label`, доработка компонента Tabs.
  - Доработаны компоненты по изменениям макетов.
  - Исправлены мелкие ошибки.

## 0.0.4 (18.08.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Валидаторы формы сделаны опциональными (вызов `withFormData.createValidationForm` без второго параметра теперь отрабатывает корректно) 
  - Обновлены зависимости:
    - `@efr/medservice-web-presentation-ui-components` 0.0.4
- `@efr/medservice-web-presentation-ui-components`    
  - Добавлен компонент `Spreadsheet`, позволяющий отрисовывать таблицу в соответствии с заданными параметрами.
  - Добавлен компонент `Collapse`, позволяющий скрывать/раскрывать контент.
  - Доработан компонент `Tab`: добавлена возможность отображать уведомдения (`badge`).
  - Доработан компонент `Input`: добавлен тип `Number`.
  - Доработан компонент `Button`: добавлен тип кнопки `additional`.
  - Доработан компонент `Link`: добавлены типы кнопок (`general`, `pseudo`, `external`).
  - Доработан компонент `Notification`: добавлен тип `notice`, удалена возможность использования иконок.
  - Доработан компонент `Hint`: добавлен props `full`(`bool`) для управления наличия отступов.
  - Для `Toggle` заданы значения по умолчанию для свойств `checked` (`false`) и `onChange` (пустой обработчик).
  - Реализован компонент `Dropdown`.

## 0.0.3 (10.08.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Реализована поддержка модальных окон.
  - Обновлены зависимости:
    - `@efr/medservice-web-presentation-ui-components` 0.0.3
    - `babel-preset-react-app` 3.0.2
    - `eslint` 4.4.1
    - `eslint-config-react-app` 2.0.0
    - `express` 4.15.4
    - `react-dev-utils` 3.1.0
    - `webpack` 3.5.2
- `@efr/medservice-web-presentation-ui-components`
  - Обновлены npm зависимости:
    - `babel-preset-react-app` 3.0.2
    - `cross-env` 5.0.5
    - `eslint` 4.4.1
    - `eslint-config-react-app` 2.0.0
    - `eslint-plugin-react` 7.2.0
    - `webpack` 3.5.2
    - `webpack-dev-server` 2.7.1
  - Обработана ситуация передачи пустого массива ошибок/предупреждений форме.
  - Добавлена возможность использования описания к компоненту Divider.
  - Добавлен Input в `InputDatepicker`.
  - Добавлен props onFocusChange в компонент `Input`.
  - Добавлена возможность задать ширину компонентам `Select`, `Input`, `Textarea`
  - Удален блок вывода ссылок для компонента Fieldset
  - Удален компонент Modal. Модальными окнами заведует `@efr/medservice-web-presentation-core`.

## 0.0.2 (07.08.2017)
- `@efr/medservice-web-presentation-ui-core`
  - Обновлены npm пакеты.
  - Реализованы инструменты валидации форм.
  - Подключена библиотека `efr/web-presentation-ui-components` версии `0.0.2`.
- `@efr/medservice-web-presentation-ui-components`
  - Обновлены npm зависимости.
  - Для `Input` задано по умолчанию значение `'text'` для параметра `type`.
  - Для `Checkbox` заданы значения по умолчанию для свойств `checked` (false) и `onChange` (пустой обработчик)
  - Добавлен параметр `tabIndex` в компоненты `Input`, `TextArea`, `InputDatepicker`.
  - Компонент `Form` принимает в свойствах массивы ошибок и предупреждений.
  - Компонент `Form` обрабатывает нажатие на `Enter`.
  - Реализован компонент `Notification`.
  - Реализован компонент `Badge`.
  - Добавлено обязательное свойство `dataId` в компоненты.
  - Доработано визуальное представление пагинации в компоненте `Grid`.
  - Доработаны компоненты по изменениям макетов.

## 0.0.1 (14.07.2017)
- Начальная версия.