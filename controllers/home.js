'use strict'

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

const Activity = require("../models/activity"); // usamos el modelo de Activity


var controller = {

    getActivities: (req, res) => {
        let body = req.body;
        if((!body.type)) {
            return res.status(200).send({
                result: "Debes especificar que criterio de búsqueda vas a hacer. "
            });    
        } else { // está todo ok
            let jsonSearch = {
                category: body.categoryId
            };
            if(type === "category") {
                jsonSearch = {
                    category: body.categoryId
                };
            } else if (type === "user") {
                jsonSearch = {
                    organizedBy: body.userId
                };
            } else if (type === "member") {
                jsonSearch = {
                    members: body.userId 
                };
            }
            Activity.find(jsonSearch, (err, activitiesFound) => {
                // notifications para que salga en las notificaciones del usuario que solicitó una invitación. se almacena en un array de ID's de users.
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        status: false,
                        authorized: true,
                        message: "Error del servidor." 
                    });
                } else {
                    if (!activitiesFound) {
                        return res.status(404).send({ 
                            status: false,
                            authorized: true,
                            message: "No se ha encontrado ninguna actividad que coincida." 
                        });
                    } else {
                        // ACÁ PODEMOS PONER EL ESTADO DE LA PETICIÓN EN UN ARRAY COMO STILLWAITING (EJEMPLO): [1, 2, 39, 59] (ESOS SON LOS ID's DE LA ACTIVIDAD) PARA QUE EL USUARIO NO PUEDA VOLVER A PEDIR MIENTRAS ESTÉ.
                        return res.status(200).send({ 
                            status: true,
                            authorized: true,
                            activities: activitiesFound,
                            message: "Se envió la invitación correctamente. " 
                        });
                    }
                }
            });
        }
    }

}; //end controller


module.exports = controller;