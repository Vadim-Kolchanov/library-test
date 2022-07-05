# Модуль Backend

Серверная часть приложения, которая обрабатывает запросы с веб-интерфейса и выдает данные пользователю

## Инструкция по запуску

1) Создать базу данных [init-database.sql](/src/data-etl/init-database.sql)
2) Произвести миграцию БД `mvn clean flyway:migrate` (подключение описывается в [pom.xml](/pom.xml))
3) Выполнить команду `mvn clean install`
4) Воспроизвести запуск приложения [ItResourceApplication](/src/main/java/ru/itresource/ItResourceApplication.java)

## Используемые технологии
| Решаемая задача                     | Технология              |
|-------------------------------------|-------------------------|
| Язык программирования               | Java 11                 |
| Программная платформа               | OpenJDK                 |
| Сборка проекта                      | Maven                   |
|                                     |                         |
| База данных                         | PostgreSQL 14           |
| Инициализация базы (миграция)       | Flyway                  |
|                                     |                         |
| Реализация веб-сервисов             | spring-boot-starter-web |
| Взаимодействие с источниками данных | spring-boot-starter-jpa |
| Взаимодействие с PostgreSQL         | postgresql              |
|                                     |                         |
| Документация API                    | Swagger                 |
