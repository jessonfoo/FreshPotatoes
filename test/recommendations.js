/* eslint-disable quotes */

const app = require('../index.js');
const request = require('supertest')(app);
const expect = require('chai').expect;

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Recommendations API', function() {
  describe('returns successful response defaults', function() {
    let cachedResponse;

    before(function(done) {
      request.get('/films/7264/recommendations').end(function(err, res) {
        cachedResponse = res;
        done();
      });
    });

    it('status 200', function() {
      expect(cachedResponse.status).to.equal(200);
    });

    it('application/json Content-Type', function() {
      expect(cachedResponse.header['content-type']).to.match(/application\/json/);
    });

    describe('recommendations key', function() {
      it('exists', function() {
        expect(cachedResponse.body).to.include.keys('recommendations');
      });

      it('is an array', function() {
        expect(Array.isArray(cachedResponse.body.recommendations)).to.be.true;
      });

      it('has lenght of 3', function() {
        expect(cachedResponse.body.recommendations).to.have.length.of(3);
      });
    });

    describe('meta key', function() {
      it('exists', function() {
        expect(cachedResponse.body).to.include.keys('meta');
      });

      it('is an object', function() {
        expect(cachedResponse.body.meta).to.be.an('object');
      });

      it('contains limit key', function() {
        expect(cachedResponse.body.meta).to.include.keys('limit');
      });

      it('contains offset key', function() {
        expect(cachedResponse.body.meta).to.include.keys('offset');
      });
    });
  });

  it('returns desired recommendations', function(done) {
    request
      .get('/films/7264/recommendations')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          recommendations: [
            {
              id: 7406,
              title: 'Agent Deathstroke Teacher',
              releaseDate: '2001-10-19',
              genre: 'Western',
              averageRating: 4.6,
              reviews: 5,
            },
            {
              id: 8298,
              title: 'Colossus Strike Police Officer',
              releaseDate: '2014-01-10',
              genre: 'Western',
              averageRating: 4.57,
              reviews: 7,
            },
            {
              id: 8451,
              title: 'Carnage Actor',
              releaseDate: '2006-02-15',
              genre: 'Western',
              averageRating: 4.33,
              reviews: 6,
            },
          ],
          meta: { limit: 10, offset: 0 },
        }, done
      );
  });

  describe('pagination', function() {
    it('can limit results', function(done) {
      request
        .get('/films/7264/recommendations?limit=1')
        .expect('Content-Type', /json/)
        .expect(
          200,
          {
            recommendations: [
              {
                id: 7406,
                title: 'Agent Deathstroke Teacher',
                releaseDate: '2001-10-19',
                genre: 'Western',
                averageRating: 4.6,
                reviews: 5,
              },
            ],
            meta: { limit: 1, offset: 0 },
          }, done
        );
    });

    it('can offset results', function(done) {
      request
        .get('/films/7264/recommendations?offset=1')
        .expect('Content-Type', /json/)
        .expect(
          200,
          {
            recommendations: [
              {
                id: 8298,
                title: 'Colossus Strike Police Officer',
                releaseDate: '2014-01-10',
                genre: 'Western',
                averageRating: 4.57,
                reviews: 7,
              },
              {
                id: 8451,
                title: 'Carnage Actor',
                releaseDate: '2006-02-15',
                genre: 'Western',
                averageRating: 4.33,
                reviews: 6,
              },
            ],
            meta: { limit: 10, offset: 1 },
          }, done
        );
    });
  });

  describe('error handling', function() {
    it('handles missing routes', function(done) {
      request
        .get('/films/1/recommendations/notarealroute')
        .expect(404)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        })
        .end(done);
    });

    it('handles invalid id', function(done) {
      request
        .get('/films/notanid/recommendations')
        .expect(422)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        })
        .end(done);
    });

    it('handles invalid query params', function(done) {
      request
        .get('/films/19/recommendations?offset=notanoffset&limit=notalimit')
        .expect(422)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        })
        .end(done);
    });
  });
});
