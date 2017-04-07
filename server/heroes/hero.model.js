const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Hero Schema
const HeroSchema = mongoose.Schema({
  heroname: {
    type: String,
    required: true
  },
  realname: {
    type: String
  },
  herocode: {
    type: String,
    required: true
  },
  team: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  basestats: {
    type: Object,
    required: true
  },
  substats: {
    type: Object,
    required: true
  }
});

const character =  mongoose.model('characters', HeroSchema);

const getCharById = function(id, callback){
  character.findById(id, callback);
}

const getCharByHeroName = function(username, callback){
  const query = {username: username}
  character.findOne(query, callback);
}

const addCharacter = function(newChar, callback){
    newChar.save(callback);
}

module.exports = {
    getCharByHeroName: getCharByHeroName,
    getCharById: getCharById,
    addCharacter: addCharacter
}