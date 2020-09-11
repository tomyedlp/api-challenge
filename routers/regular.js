'use strict'

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

var express = require('express');
var regularController = require('../controllers/regular');

const { checkToken } = require("../middlewares/authenticated");

var router = express.Router();

// rutas con sus middleware correspondiente
router.post('/join-activity', checkToken, regularController.joinActivity);
router.post('/action-invitation', checkToken, regularController.actionInvitation);

module.exports = router; //exporta los routers