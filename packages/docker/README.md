# Инструмент сборки и загрузки Docker образа в Docker Registry.

Пример использования в package.json:
```
{
...
  "dockerOptions":{
    "imageName": "rshb/efr/presentation/web-presentation-core/mock/web-presentation-core:test"
  },

  "devDependencies": {
    ...
    "@efr/medservice-docker" : "0.0.1"
  },

  "scripts": {
    "docker-push": "docker-push"
  },
```

Запуск командой:
```bash
npm run docker-push
``` 

Для целей автосборки (Jenkins) запустить с параметром type:
```bash
npm run docker-push -- --type=auto
```