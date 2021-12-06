# Informations

Pong Game est une application React avec une API express. Une base psql est utilisé, sequelize pour l'orm.
Le jeu utilise la librairie [p5js](https://p5js.org/) permet la gestion du canvas

## Installation

Front

Le projet React est basé sur l'[Atomic Design](https://medium.com/@frkhourdin/architecturer-un-projet-react-avec-latomic-design-bce9a3e422d0), Tailwind est utilisé pour le CSS. 

```
cd pong-game/front
yarn
set REACT_APP_API_URL in .env
yarn start
```

Back

```
cd pong-game/api
yarn
set PORT in .env
set DB_PASSWORD in .env
yarn start
```
