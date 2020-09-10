'use strict'

const moment = require('moment');

const axios = require('axios');

//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
/*****************************************************/

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'mail.tomasbusquets.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_HOSTING_USER, // your domain email address
        pass: process.env.EMAIL_HOSTING_PASS // your password
    }
});

var controller = {

    sendMessage: (req, res) => {
        let body = req.body;
        let allOk = "OK";
        console.log(body);
        if((!body.name)) {
            allOk = "NAMES";
            return res.status(200).send({
                result: allOk
            });
        } else if(!body.country) {
            allOk = "COUNTRY";
            return res.status(200).send({
                result: allOk
            });
        } else if(!body.email || (!validateEmail(body.email))) {
            allOk = "EMAIL";
            return res.status(200).send({
                result: allOk
            });
        } else if(!body.comments) {
            allOk = "COMMENTS";
            return res.status(200).send({
                result: allOk
            });
        } else if(!body.recaptcha) {
            allOk = "RECAPTCHA";
            return res.status(200).send({
                result: allOk
            });
        } else {
            const token = body.token;
            const secret_key = process.env.SECRET_API_KEY_RECAPTCHA;
            const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
            axios.post(url)
                .then(rest => {
                    if(rest.data.success) {
                        let subject = body.subject;
                        if(body.subject === "") {
                            subject = "Sin asunto";
                        }
                        var mailOptions = {
                            from: body.email,
                            to: process.env.EMAIL_HOSTING, //email HOSTING
                            subject: "[EMAIL DESDE WEB] "+subject,
                            text: textBodyEmail(body)
                        };
                        transporter.sendMail(mailOptions, 
                            function(error, info) {
                                if (error) {
                                    console.log(error);
                                    return res.status(200).send({
                                        result: "ERROR_EMAIL"
                                    });
                                } else {
                                    //console.log('Email sent: ' + info.response);
                                    return res.status(200).send({
                                        result: allOk
                                    });
                                }
                            }
                        );
                    } else {
                        return res.status(200).send({
                            result: "RECAPTCHA"
                        });
                    }
                }).catch(err => {
                    return res.status(200).send({
                        result: "RECAPTCHA"
                    });
                });
        }
    }

}; //end controller

module.exports = controller;


//////////////////////////////////
/////// INTERNAL FUNCTIONS ///////
//////////////////////////////////
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function textBodyEmail(body) {
    let contentMail = "";
    let today = moment().format("DD/MM/YYYY");
    contentMail += "Fecha: "+today+"\n";
    contentMail += "Nombre y apellido: "+body.name+"\n";
    contentMail += "País: "+body.country+"\n";
    contentMail += "Email: "+body.email+"\n\n";
    contentMail += "Asunto: "+body.subject+"\n\n";
    contentMail += "Presupuesto estimado: "+body.budget+"\n\n";
    contentMail += "Mensaje: "+body.comments+"\n\n\n";
    return contentMail;
}
