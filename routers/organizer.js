'use strict'

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

var express = require('express');
var organizerController = require('../controllers/organizer');

const { checkToken, checkRol } = require("../middlewares/authenticated");

var router = express.Router();

// rutas con sus middleware correspondiente
router.post('/update-activity', [checkToken, checkRol], organizerController.updateActivity);
router.post('/remove-activity', [checkToken, checkRol], organizerController.removeActivity);
router.post('/send-invitation', [checkToken, checkRol], organizerController.sendInvitation);
router.post('/action-join-activity', [checkToken, checkRol], organizerController.actionJoinActivity);

module.exports = router; //exporta los routers