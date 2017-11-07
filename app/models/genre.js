"use strict";
var Sequelize = require('sequelize');
module.exports = function (sequelize, type) {
  return sequelize.define("genre", {
      name: Sequelize.STRING
  },{
      timestamps     : false,
      underscored : true,
      freezeTableName : true
  });
};
