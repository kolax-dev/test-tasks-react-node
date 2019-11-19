# test-tasks-react-node

## Install

* make config DB PostgreSQL and create database example 'test_db':

cd server/config/db.js

run app:

*(React) 

cd client

npm i

npm run start

*(Node js) 

cd server

npm i

npm run start

---


## Description

Cерверная часть приложения работает c базой данных PostgreSql поэтому необходимо чтобы она также была предварительно установлена и создана пустая база данных которую укажите в конфиге cd server/config/db.js например test_db , сам сервер запускается на 5000 порту поэтому он должен быть не занят другим какимто приложением.

Клиентская часть приложения по умолчанию запускается на 3000 порту но если он занят React сам предложит запустить его на другом после npm run start

!! Создание таблицы и первых 1000 записей происходит по адресу: http://localhost:5000/tasks/insert-fake-tasks

Для решения второй части задачи рандомное добавление/удаление/изменение записей функции сделан интервал в 1 секунду


Copyright (c) 2019 Alexandr Kolot 
