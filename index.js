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

function getReviewsByFilmId(filmId) {
  return Promise.resolve(request('get', 'http://credentials-api.generalassemb.ly/4576f55f-c427-4cfc-a11c-5bfe914ca6c1?films=' + filmId));
}

function getAverageReviewRatingByFilmId(filmId) {
  return getReviewsByFilmId(filmId)
  .then(res => {
    let data = JSON.parse(res.getBody())[0];
    let reviews = data.reviews;
    let length = data.reviews.length;
    if (length >= 5) {
      let totalRating = reviews.reduce((sum, review) => {
        if (typeof sum == 'object') {
          return parseInt(sum.rating) + parseInt(review.rating);
        }
        return sum + parseInt(review.rating);
      });
      let average = totalRating / length;
      return average.toFixed(2);
    }
  });
}

function getRatings(filmsArray) {
  return Promise.each(filmsArray,function(film) {
    return getAverageReviewRatingByFilmId(parseInt(film.id)).then( rating => {
      if(rating) {
        film.averageRating = rating;
        console.log(film);
        return film;
      }
    });
  });
}
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
      getRelatedFilms(filmId).then(films =>
        getRatings(films))
      .then( ratings => {
        console.log(ratings);
        return res.status(200).json(ratings);

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
