'use strict'

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

var express = require('express');
var homeController = require('../controllers/home');

// acá no hay middlewares, cualquiera puede acceder

var router = express.Router();

// rutas con sus middleware correspondiente
router.post('/get-activities', homeController.getActivities);
router.post('/all-activities-user', homeController.allActivitiesUser);
router.post('/all-activities-member', homeController.allActivitiesMember);

module.exports = router; //exporta los routers