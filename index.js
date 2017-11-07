const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('then-request'),
      Promise = require('bluebird'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

// define sequelize
var sequelize = new Sequelize('main','username','password', {
  dialect: 'sqlite',
  storage: DB_PATH,
  port   : 3306
});
const Film = sequelize.import('./app/models/film');
const Genre = sequelize.import('./app/models/genre');

// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  res.status(500).send('Not Implemented');
}


module.exports = app;
