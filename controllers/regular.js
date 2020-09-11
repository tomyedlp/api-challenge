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

    joinActivity: (req, res) => {
        let body = req.body; // CONTENIDO ejemplo traído del front-end
        if((!body.activity._id)) { // chequeamos de que exista el _id de la actividad (es _id porque el MongoDB lo genera así el nombre)
            return res.status(200).send({
                result: "El id de la actividad es obligatorio. "
            });    
        } else { // está todo ok
            // ANTES DE ENVIAR LA PETICIÓN HAY QUE VERIFICAR DE QUE EL USUARIO NO TENGA PENDIENTE LA PETICIÓN (NO LO VOY A PONER ACÁ)
                // (...)
            // LUEGO DE QUE SE VERIFICÓ DE QUE NO TIENE PENDIENTE LA PETICIÓN, PROCEDE LO SIGUIENTE:
            Activity.findByIdAndUpdate({ _id: body.activity._id }, { $push: { notifications: req.user._id } }, {new: true}, (err, updatedActivity) => {
                // notifications para que salga en las notificaciones del usuario que solicitó una invitación. se almacena en un array de ID's de users.
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        status: false,
                        authorized: true,
                        message: "Error del servidor." 
                    });
                } else {
                    if (!updatedActivity) {
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
                            message: "Se envió la invitación correctamente. " 
                        });
                    }
                }
            });
        }
    },

    actionInvitation: (req, res) => {
        let body = req.body;
        let action = body.action; // "accept" or "decline"
        if((!body.activity._id)) {
            return res.status(200).send({
                result: "La actividad es obligatoria. "
            });
        } else { // está todo ok
            if(action === "accept") { // si aceptó, modificamos la base de datos a la colección activity.
                Activity.findOneAndUpdate({ _id: body._id, members: { $ne: req.user._id }}, { $push: { members: req.user._id } }, (err, addedUserInActivity) => {
                    // hago push porque el objecto members es un array de ID's de Users en la base de datos
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            status: false,
                            authorized: true,
                            message: "Error del servidor." 
                        });
                    } else {
                        if (!addedUserInActivity) {
                            return res.status(404).send({ 
                                status: false,
                                authorized: true,
                                message: "No se ha encontrado ninguna actividad que coincida." 
                            });
                        } else {
                            // ACÁ PODEMOS ACTUALIZAR LA BASE DE DATOS AL MODELO USUARIO PARA QUE SUME UN VALOR EN CANTIDAD DE ACTIVIDADES UNIDAS
                            // HACIENDO ESTO: $inc: { activities: 1 } en findOneAndUpdate
                            return res.status(200).send({ 
                                status: true,
                                authorized: true,
                                message: "Aceptaste la invitación. ¡Bienvenido!" 
                            });
                        }
                    }
                });
            } else {
                return res.status(200).send({ 
                    status: true,
                    authorized: true,
                    message: "Has rechazado la invitación. :( Esperamos que vuelvas! " 
                });
            }
        }
    }

}; //end controller


module.exports = controller;