'use strict'

//////////////////////////////////////////////////////
/////////////////// CV TOMAS ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

var express = require('express');
var controller = require('./controller');

var router = express.Router();

// rutas de prueba
router.post('/sendmessage', controller.sendMessage);

module.exports = router; //exporta los routers