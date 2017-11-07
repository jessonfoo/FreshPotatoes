module.exports = function (sequelize, type) {
  return sequelize.define("films", {
    title            : type.STRING,
    release_date     : type.DATE,
    tagline          : type.STRING,
    revenue          : type.BIGINT,
    budget           : type.INTEGER,
    runtime          : type.INTEGER,
    original_language: type.STRING,
    status           : type.STRING,
    genre_id         : type.INTEGER
  });
};