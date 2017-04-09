const mongoose = require('mongoose'),
  config = require('../../configs/database'),
  async = require('async') ,
  debug = require('debug')('marvel:'+ require('path').basename(__filename));

const TableConstants = {
  TABLE_NAME: "heroes",
  FIELD_HERO_NAME: "heroname",
  FIELD_REAL_NAME: "realname",
  FIELD_HERO_CODE: "herocode",
  FIELD_TYPE: "type",
  FIELD_TEAM: "team",
  FIELD_IMAGE: "image",
  FIELD_DESC: "description",
  FIELD_BASE_STATS: "basestats",
  FIELD_SUB_STATS: "substats"
}

const TableSchema = mongoose.Schema({
  realname: {
    type: String
  },
  team: {
    type: Object
  },
  image: {
    type: String
  },
  description: {
    type: Object
  },
  herocode: {
    type: String,
    required: true
  },
  heroname: {
    type: String,
    required: true
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

const Model = mongoose.model(TableConstants.TABLE_NAME, TableSchema);

const getNewModel = function (data) {
   debug("Hero model getNewModel " );
  return new Model(new Hero(data));
}

const getAll = function (callback) {
  debug("Hero model getall " );
  Model.find(callback);
}

const getById = function (id, callback) {
  debug("Hero model getById " );
  Model.findById(id, callback);
}

const getByCode = function (code, callback) {
  
  const query = {} ; query[TableConstants.FIELD_HERO_CODE] = code;  
  debug("Hero model getByCode " + query);
  Model.findOne(query, callback);
}

const add = function (newData, callback) {
  debug("Hero model add " , new Hero(newData));
  let _newData = new Model(new Hero(newData));
  _newData.save(callback);
}

const remove = function (code, callback) {
  debug("Hero model add : " + code);
 Model.remove({herocode:code},callback)
}


const update = function (updateData, completeCallback) {

  let _updateData = new Hero(updateData);
  debug("Hero model update : " + _updateData[TableConstants.FIELD_HERO_CODE] , _updateData);
  async.waterfall([

    // find by code
    function(callback){
      getByCode(_updateData[TableConstants.FIELD_HERO_CODE], 
          (err,data)=>{
            
            if(err){
              completeCallback(err,data);
            }else{
              // return data
              callback(null,data);
            }
          }
       )
    },

    // save the update
    function(data){
        debug("Hero model saving.. ");
        Object.assign(data, _updateData);
      data.save( completeCallback  );
    }
  ]) ;
}


const Hero = function (value) { 
    this.realname = value.realname || '';
    this.team = value.team || [];
    this.herocode = value.herocode || '';
    this.heroname = value.heroname || '';
    this.image = value.image || '';
    this.description = value.image || '';
    this.type = value.type || '';
    this.basestats = new BaseStats(value.basestats);
    this.substats = new SubStats(value.substats);
    return this; 
}

const BaseStats = function (value) {  
  this.health = value.health || 0;
  this.power = value.power || 0;
  return this;
}

const SubStats = function (value) {
    this.strength = value.strength || 0;
    this.stamina = value.stamina || 0;
    this.speed = value.speed || 0;
    this.agility = value.agility || 0;
    this.intelligence = value.intelligence || 0;
    return this;
}

module.exports = {
  getNewModel: getNewModel,
  getModel: Model,
  getByCode: getByCode,
  getById: getById,
  add: add,
  remove: remove,
  update: update,
  getAll: getAll
}