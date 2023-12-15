# TODO
* Валидация
  1. Убрать функцию renderField. createField должен возвращать компонент.
  1. Упростить создание составных форм и форм, содержащих списочные структуры
* RestClient
  1. 401 handle
* Menu
  1. Динамическое левое меню (см. макеты поиска и антеты клиента)
* DevApp
  1. Упростить отладку интеграции с бекендом при наличии зависимых сервисов (один из вариантов - сделать работу через ApiGateway).
* Обработка ошибок ([Пример обработчиков StatusCode AJAX запросов](./src/integration/ResponseStatus.js))
* Cache/Store
* Дописать недостающие тесты
* Документация

---

* `npm install --global rimraf`
* `npm config set @efr:registry http://coral:18088/repository/efr-presentation/`
* `create-react-app my-app --scripts-version @efr/medservice-web-presentation-core`