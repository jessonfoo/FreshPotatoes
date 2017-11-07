"use strict";
module.exports = function (sequelize, type) {
  return sequelize.define("genre", {
      name: type.STRING
  })
};
