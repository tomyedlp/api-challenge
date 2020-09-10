//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
// WEBSITE: www.tomasbusquets.com
/*****************************************************/

//PUERTO
process.env.PORT = process.env.PORT || 3050;
// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //dev, host or prod
process.env.API_URL = process.env.API_URL || `/api/`;

process.env.SECRET_API_KEY_RECAPTCHA = process.env.SECRET_API_KEY_RECAPTCHA || "6LfsSKcZAAAAAMv7U4ZJ9stRNnbkuiDzhYX0nBIa";

process.env.EMAIL_HOSTING_USER = process.env.EMAIL_HOSTING_USER || 'no-reply@tomasbusquets.com' //TO-DO: NO REPLY EMAIL HOSTING TO SEND
process.env.EMAIL_HOSTING_PASS = process.env.EMAIL_HOSTING_PASS || 'NoReply___t0m4sBusqu3ts_1' //TO-DO: NO REPLY EMAIL HOSTING PASS

process.env.EMAIL_HOSTING = process.env.EMAIL_HOSTING || 'busquets64@gmail.com' //TO-DO: EMAIL HOSTING TO RECEIVE