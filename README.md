# Установка CouchDB

Игра использует базу данных CouchDB и обертку PouchDB для хранения данных в influxDB. Алгоритм установки есть на офф сайте https://pouchdb.com/guides/setup-couchdb.html

Кратко: 

`sudo apt-get install couchdb`
`npm install -g add-cors-to-couchdb`
`add-cors-to-couchdb`


# Настройка CouchDB

И UI и сервер общаются с CouchDB. Так что, база должна быть доступна снаружи по порту 5984. Порт можно поменять.

Настроить путь по которому UI ищет базу можно в файле /home/drxwat/projects/space-for-communication/apps/game-ui/src/environments/environment.ts

Настроить путь по которому сервер ищет базу можно в файле /home/drxwat/projects/space-for-communication/apps/game-server/src/assets/db.json

Данный файл не сохраняется в репозитории т.к. содержит небезопасную информацию.

Струкрута файла:

```
{
  "db": "http://localhost:5984/",
  "login": "login",
  "password": "password"
}
```

# Установка Сборка

Установить nodejs (на момент разработки версия nodejs - v10.19.0, npm - 6.13.4) и из корня проекта вызвать `npm i`

Запуск скрипта сборки генерирует продакшн билд приложения в папке `/dist`

Сборка UI 
`npm run build`

Сборка сервера
`npm run build:be`
