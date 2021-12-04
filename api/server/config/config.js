const config = {
  "development": {
    "username": "lorenzo",
    "password": process.env.DB_PASSWORD,
    "database": "pong-game-db",
    "host": "79.137.38.122",
    "dialect": "postgres"
  }
}

module.exports = config
