# Проект Mesto фронтенд + бэкенд

Домен: http://dna-mesto-react.students.nomoreparties.co/  
Публичный IPv4: 84.201.134.116

## Директории

`/routes` — папка с файлами роутера  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Роуты

`POST /signup` — регистрация   
`POST /signin` — логин   

`GET /users` — возвращает всех пользователей   
`GET /users/:userId` - возвращает пользователя по _id   
`POST /users` — создаёт пользователя   
`PATCH /users/me` — обновляет профиль   
`PATCH /users/me/avatar` — обновляет аватар   

`GET /cards` — возвращает все карточки   
`POST /cards` — создаёт карточку   
`DELETE /cards/:cardId` — удаляет карточку по идентификатору   
`PUT /cards/:cardId/likes` — поставить лайк   
`DELETE /cards/:cardId/likes` — убрать лайк  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
