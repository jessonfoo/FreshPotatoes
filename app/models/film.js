var Sequelize = require('sequelize');
var Genre = require('./genre');
module.exports = function (sequelize, data) {
  return sequelize.define("films", {
    title            : Sequelize.STRING,
    release_date     : Sequelize.DATE,
    tagline          : Sequelize.STRING,
    revenue          : Sequelize.BIGINT,
    budget           : Sequelize.INTEGER,
    runtime          : Sequelize.INTEGER,
    original_language: Sequelize.STRING,
    status           : Sequelize.STRING,
    genreId          : {
      type: Sequelize.INTEGER,
      references: {
        model: Genre,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      field     : 'genre_id'
    },
  },{
    timestamps     : false,
    underscored    : true,
    freezeTableName: true
  })
};