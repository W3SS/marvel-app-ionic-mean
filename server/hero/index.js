const express = require('express'),
  router = express.Router();
  ctrl  = require('./controller/hero.controller');

router.put('/', ctrl.put );

router.get('/', ctrl.query );

router.post('/', ctrl.add );

router.delete('/', ctrl.remove );

module.exports =  router;
