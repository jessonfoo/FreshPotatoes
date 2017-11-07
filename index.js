/* eslint-disable brace-style */
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
const sequelize = new Sequelize('main','username','password', {
  dialect: 'sqlite',
  storage: DB_PATH,
  port   : 3306
});
const Film = sequelize.import('./app/models/film');
const Genre = sequelize.import('./app/models/genre');

// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// FUNCTIONS
function getRelatedFilms(filmId) {
  return Promise.resolve(
    Film.sync()
    .then(function() {
      return Film.find({where: {id: filmId}});
    })
    .then(filmQueryResponse => {
      // parse film query
      let film = filmQueryResponse.get({simple: true});
      console.log(film);
      // define the genre id && parse int
      let genreId = parseInt(film.genreId);
      // use the film release date to create a new Date that we can use to query with
      let d = new Date(film.release_date);
      let day = d.getDay();
      let month = d.getMonth();
      let year = d.getFullYear();
      let releaseMin = new Date(year - 15, month, day);
      let releaseMax = new Date(year + 15, month, day);
      // do a new query for all films of same genre id
      return Film.findAll({
        where: {
          release_date:{
            $lt: releaseMax,
            $gt: releaseMin
          },
          genre_id: genreId
        }
      }).then(films => {
        let filmsArray = films.map(f => f.toJSON());
        return filmsArray;
      });
    })
  );
}
// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  try {
   let params = req.params;
   let filmId = parseInt(params.id);

    sequelize.sync().then(function() {
      getRelatedFilms(filmId).then(films => {
        res.json(films);
      });
    });

  }
  catch(e) {
    if(e && e.message) {
      res.status(400).send('Error: ' + e.message);
    } else {
      console.log(e);
      res.status(500).send('Internal Server Error: Please Check Logs');
    }

  }
}


module.exports = app;
