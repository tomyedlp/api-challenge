'use strict'

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/


const moment = require('moment');
const jwt = require("jsonwebtoken");
const path = require('path');

const { PlantillaEmail } = require("../utils/functions");

const Activity = require("../models/activity"); // usamos el modelo de Activity


var nodemailer = require('nodemailer'); // usamos la librería de nodemailer para mandar emails
var transporter = nodemailer.createTransport({
    host: process.env.SETUP_MAIL_HOSTING, //USAMOS EL STP O POP, O COMO SEA, LO QUE TENGA EL HOSTING PARA ENVIAR EMAILS
    port: 465, // hosting email port
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_HOSTING_USER, // your domain no-reply email address
        pass: process.env.EMAIL_HOSTING_PASS // your no-reply password 
    }
});


var controller = {

    updateActivity: (req, res) => {
        let body = req.body; // CONTENIDO ejemplo traído del front-end
        if((!body._id)) { // chequeamos de que exista el _id de la actividad (es _id porque el MongoDB lo genera así el nombre)
            return res.status(200).send({
                result: "El id de la actividad es obligatorio. "
            });
        } else if((!body.name)) { // name se refiere al nombre de la actividad, acá siempre es mejor estar seguro, tanto del front-end como backend que los datos estén correctos, en este caso que no sea undefine o vacío
            return res.status(200).send({
                result: "El nombre de la actividad es obligatorio. "
            });
            // y ponemos más condiciones si hay otras keys, dependiendo de lo que sea, puede preguntar si el value es un valor numérico, si tiene más de X caractéres, etc lo que se ocurra según corresponda        
        } else { // está todo ok
            // ACTIVITY ES EL MODELO DE MONGOOSE QUE ACÁ NO VOY A PONERLO, ABAJO PONDRÉ UN EJEMPLO DE COMO ESTÁ ESTRUCTURADO.
            Activity.findByIdAndUpdate({ _id: body._id }, { name: body.name, modified: moment() }, {new: true}, (err, updatedActivity) => {
                // modified almacenamos la fecha exacta de la modificación
                // { new: true } es para que devuelva los valores actualizados tras actualizarse (por algún motivo MongoDB no devuelve los datos actualizados si no se pone eso)
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
                        return res.status(200).send({ 
                            status: true,
                            authorized: true,
                            result: updatedActivity, // acá enviamos la actividad modificada (para que el frontend refleje los cambios (por ej. si hay una Hook en React, lo almacena y así se verá reflejada sin tener que recargar la página))
                            message: "Se modificó la actividad correctamente. " 
                        });
                    }
                }
            });
        }
    },

    removeActivity: (req, res) => { // eliminamos la actividad
        let body = req.body; // CONTENIDO ejemplo traído del front-end
        if((!body._id)) { // chequeamos de que exista el _id de la actividad (es _id porque el MongoDB lo genera así el nombre)
            return res.status(200).send({
                result: "La actividad es obligatoria. "
            });
        } else { // está todo ok
            // ACTIVITY ES EL MODELO DE MONGOOSE QUE ACÁ NO VOY A PONERLO, ABAJO PONDRÉ UN EJEMPLO DE COMO ESTÁ ESTRUCTURADO.
            Activity.findByIdAndRemove(body._id, (err, removedActivity) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        status: false,
                        authorized: true,
                        message: "Error del servidor." 
                    });
                } else {
                    if (!removedActivity) {
                        return res.status(404).send({ 
                            status: false,
                            authorized: true,
                            message: "No se ha encontrado ninguna actividad que coincida." 
                        });
                    } else {
                        return res.status(200).send({ 
                            status: true,
                            authorized: true,
                            message: "Se eliminó la actividad correctamente. " 
                        });
                    }
                }
            });
        }
    },

    sendInvitation: (req, res) => { // eliminamos la actividad
        let body = req.body; // CONTENIDO ejemplo traído del front-end
        if((!body.activity._id)) { // chequeamos de que exista el _id de la actividad (es _id porque el MongoDB lo genera así el nombre)
            return res.status(200).send({
                result: "El nombre de la actividad es obligatorio. "
            });
        } else if(body.user._id) { // el id del usuario a invitar (y el de invitador? está en req.user con el _id, username, etc, no necesitamos nada)
            return res.status(200).send({
                result: "El usuario es obligatorio. "
            });
        } else { // está todo ok
            let tokenInvitation = jwt.sign({ // CREAMOS UN OBJECTO CON LOS VALORES ALMACENADOS QUE CONSIDERAMOS IMPORTANTES
                id: req.user._id, // el ID único del usuario, del invitador.
                invited: body.user._id, // nombre del user
                activity: body.activity._id,
                dateInvited: moment().format("DD/MM/YYYY HH:mm:ss")
            }, process.env.SEED_INVITATION); // usamos una seed distinta al de login
            let jsonData = { // ARMO UN JSON PARA PONERLO EN LA PLANTILLA DEL EMAIL A ENVIAR
                titleEmail: "¡"+req.user.user+" te ha invitado a una actividad!",
                contentEmail: `¡Hola, ${body.user.user}! ${req.user.user} te ha invitado a ${body.activity.name}. Para aceptar, por favor haga click <a href="https://${process.env.WEBPAGE_BASE_URL}/send/invitation/accept/${tokenAcceptInvitation}" target="_blank">aquí</a> o copie el siguiente enlace y entre con su navegador:`,
                anotherContentEmail: `https://${process.env.WEBPAGE_BASE_URL}/send/invitation/accept/${tokenInvitation}`, // enviamos la token que generamos recién
                otherData: `Si querés rechazar la invitación por favor hagá click <a href="https://${process.env.WEBPAGE_BASE_URL}/send/invitation/decline/${tokenAcceptInvitation}">aquí</a>.`
            }
            var mailOptions = {
                from: process.env.EMAIL_HOSTING_USER, // ACÁ PONEMOS EL EMAIL OFICIAL DE LA PÁGINA (COMO UN NO-REPLY@WEBPAGE.COM) se puede poner el mail de invitador, pero no usaremos el mail personal
                to: body.user.email, // el email del usuario a invitar
                subject: "Invitación - "+process.env.NAME_WEB,
                html: PlantillaEmail(jsonData), // acá es una función para que arme el html (sino acá es muy largo e ilegible), lo traemos de utils/functions.js
                attachments: [{ filename: 'logo.png', cid: `logo@imagen`, path: path.join(__dirname, '../utils/logo.png' )}] // acá ponemos el logo de la página o lo que sea para ponerlo en el email, de lo contrario no aparece
            };
            transporter.sendMail(mailOptions, // usamos el nodemailer
                function(error, info) {
                    if (error) {
                        // pasó algo
                        console.log(error);
                        return res.status(200).send({ 
                            status: true,
                            authorized: true,
                            message: "Falló al enviar la invitación. " 
                        });
                    } else {
                        return res.status(200).send({ 
                            status: true,
                            authorized: true,
                            message: "Se envió la invitación correctamente. " 
                        });
                    }
                }
            );
        }
    },

    actionJoinActivity: (req, res) => {
        let body = req.body;
        let action = body.action; // "accept" or "decline"
        if((!body.activity._id)) { // chequeamos de que exista el _id de la actividad (es _id porque el MongoDB lo genera así el nombre)
            return res.status(200).send({
                result: "El nombre de la actividad es obligatorio. "
            });
        } else if(body.anotherUser._id) { // el id del usuario que solicitó unirse
            return res.status(200).send({
                result: "El usuario es obligatorio. "
            });
        } else { // está todo ok
            if(action === "accept") { // si aceptó, modificamos la base de datos a la colección activity.
                Activity.findOneAndUpdate({ _id: body._id, members: { $ne: body.anotherUser._id }}, { $push: { members: body.anotherUser._id } }, (err, addedUserInActivity) => {
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
                                message: "Se agregó el usuario a la actividad correctamente. " 
                            });
                        }
                    }
                });
            } else {
                //rechazado, no cambia nada en la base de datos, a lo sumo una notificación al usuario que solicitó unirse o un mail, lo que sea
                return res.status(200).send({ 
                    status: true,
                    authorized: true,
                    message: "Has rechazado al usuario. " 
                });
            }
        }
    }

}; //end controller

module.exports = controller;