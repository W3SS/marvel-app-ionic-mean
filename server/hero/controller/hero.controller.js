const Hero = require('../model/hero.model'),
   debug = require('debug')('marvel:'+ require('path').basename(__filename));

const add = function (req, res, next) {
  
  let newHero = {
    realname: req.body.realname,
    team: req.body.team,
    herocode: req.body.herocode,
    heroname: req.body.heroname,
    type: req.body.type,
    basestats: req.body.basestats,
    substats: req.body.substats
  };

  debug('add new hero ', newHero);

  Hero.add(newHero, (err, data) => {
    debug('add new Hero Result : ' + err , data);
    if (err) {
      res.json({ success: false, msg: 'Can not add Hero!', data: data });
    } else {
      res.json({ success: true, msg: 'Hero succesfully added!', data: data });
    }
  }); 
}

const query = function (req, res, next) {
  debug('query ' ,req.body);
  Hero.getAll((err, data) => {
    debug('getall ' + err , data);
    if (err) {
      res.json({ success: false, msg: 'Error on query!', data: data });
    } else {
      res.json({ success: true, msg: 'Query Success!', data: data });
    }
  })
}

 

const remove = function (req, res, next) {
  
  let code = (req.body.code || req.params.code || req.query.code || '').toUpperCase();
  debug("removing hero " + code);

  Hero.remove(code, (err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Error on removing Hero!', data: data });
    } else {
      res.json({ success: true, msg: 'Remove Success!', data: data });
    }
  })
}

const put = function (req, res, next) {
  
  debug("updating hero " + req.body);

  let updateHero = {
    realname: req.body.realname,
    team: req.body.team,
    herocode: req.body.herocode,
    heroname: req.body.heroname,
    type: req.body.type,
    basestats: req.body.basestats,
    substats: req.body.substats
  };

  Hero.update(updateHero, (err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Error on updating Hero!', data: data });
    } else {
      res.json({ success: true, msg: 'Update Success!', data: data });
    }
  });
}

module.exports = {
  add: add,
  query: query,
  remove: remove,
  put: put
};
