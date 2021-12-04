'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matchs extends Model {}
  Matchs.init({
    firstPseudo: DataTypes.STRING,
    secondPseudo: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matchs',
  })
  return Matchs
}
