# Место

**<ins>[В данном сервисе](https://levineye13.github.io/mesto-react/)</ins>** представлены иллюстрации замых захватывающих мест России.

## Технологии

![HTML5](https://img.shields.io/badge/-HTML5-ff4500?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-0000cd?style=flat&logo=CSS3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-ffff00?style=flat&logo=JavaScript&logoColor=ff4500)
![React](https://img.shields.io/badge/-ReactJS-0000cc?style=flat&logo=React&logoColor=white)
![Express](https://img.shields.io/badge/-ExpressJS-dddd00?style=flat&logo=Node.js&logoColor=ff4400)

- _БЭМ_
  - [Основные понятия](https://ru.bem.info/methodology/key-concepts/)
  - [Файловая структура](https://ru.bem.info/methodology/filestructure/)
- [Flexbox](https://www.w3.org/TR/css-flexbox-1/)
- [Grid Layout](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
- [Адаптивная верстка](https://developer.mozilla.org/ru/docs/Web/CSS/@media)
- [DOM](https://developer.mozilla.org/ru/docs/DOM/DOM_Reference/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5)
- [Валидация формы](https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B)
- [Асинхронный JS](https://learn.javascript.ru/async)
- [Работа с API](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [React](https://ru.reactjs.org/docs/getting-started.html)
- [Npm](https://docs.npmjs.com/)
- [API REST](https://ru.wikipedia.org/wiki/REST)

## Доступные скрипты

### `npm run start`

Запускает приложение в режиме разработки.
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

### `npm test`

Запускает средство запуска тестов.
Дополнительная информация: [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Собирает готовое приложение в папку `build`.

## Деплой проекта на GitHub Pages

### 1. Добавьте `homepage` в `package.json`

    "homepage": "https://myusername.github.io/my-app",

### 2. Установите `gh-pages`

    npm install --save gh-pages

### 3. Добавьте `скрипты` для деплоя в `package.json`

    "scripts": {
      "predeploy": "npm run build",   +
      "deploy": "gh-pages -d build",  +
      "start": "react-scripts start",
      "build": "react-scripts build",
    }

### 4. Разверните сайт, запустив `npm run deploy`

    npm run deploy

### 5. Убедитесь, что в настройках проекта используется `gh-pages`

<img src="https://i.imgur.com/HUjEr9l.png" width=500 />

### 6. Опционально. Вы можете настроить собственный `домен`

Подробнее: [Установка домена](https://create-react-app.dev/docs/deployment/#step-5-optionally-configure-the-domain)
