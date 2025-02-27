# Сборка\шаблон для разработки React + TypeScript + Vite 

В сборке: Темная-светлая тема, авторизация jwt(без регистрации). 

Material ui, axios для запросов, настроен safeFetch в который оборачивается каждый запрос, подставляется токен авторизация, заголовки(самые базовые).

## Для работы npm i, npm run dev, создать env с переменной для сборки(актуальный ip/url)можно создать .env.local что бы иметь 2 версии для разработки(env.local) и для продакшин версии(env)/ Переменные должны быть использованы в Services/api/api.ts host переменная

### Для тестирования использовать vitest, доустановить React Testing Library

