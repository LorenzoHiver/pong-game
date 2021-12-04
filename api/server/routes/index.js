const matchsController = require('../controllers').matchs

module.exports = (app) => {
  app.post('/api/matchs', matchsController.create)
  app.get('/api/matchs', matchsController.getAll)
  app.put('/api/matchs', matchsController.updateScore)
}
