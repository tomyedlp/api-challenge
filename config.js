//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
// WEBSITE: www.tomasbusquets.com
/*****************************************************/

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //dev, host or prod (acá es donde comienza todo)

if(process.env.NODE_ENV === "dev") { // ACÁ PONGO VARIABLES ENV QUE DEBEN SER DISTINTOS AL ESTAR EN DISTINTOS ENTORNOS
    process.env.PORT = process.env.PORT || 3050;
} else if (process.env.NODE_ENV === "host") { // SI ESTOY EN UN ENTORNO DE HOSTING DE PRUEBA
    process.env.PORT = process.env.PORT || 3666;
} else if(process.env.NODE_ENV === "prod") { // EN PRODUCCIÓN, OFICIAL
    process.env.PORT = process.env.PORT || 3888;
} else { // SI PASÓ POR ACÁ ES PORQUE ESCRIBIMOS MAL EL VALUE DE NODE_ENV
    process.env.PORT = process.env.PORT || 3050;
}

process.env.API_BASENAME = process.env.API_BASENAME || `/api/`;
process.env.API_VERSION = process.env.API_VERSION || `/v1/`;
process.env.API_URL = process.env.API_URL || process.env.API_BASENAME+process.env.API_VERSION; //unimos la url


// acá suelo poner variables como EMAILS (para usar en nodemailer, por ej), API KEYS, TOKEN, ETC 
// TODO LO REFERENTE PARA MODIFICAR SIN TENER QUE ANDAR TOCANDO CADA ARCHIVO. ejemplo:
process.env.SEED = process.env.SEED || 'SJDS829D9N9$·$$%$2#~~~@#FIFI'; // EJEMPLO, ESTO NO DEBE SALIR DE ACÁ, ES PRIVADO, PARA EL JWT
process.env.WEBPAGE_BASE_URL = process.env.WEBPAGE_BASE_URL || "WEBPAGE.COM"; // la página en producción, de ejemplo.
process.env.NAME_MARCA = process.env.NAME_MARCA || "WEBPAGE"; // el nombre de la empresa
process.env.EMAIL_HOSTING_USER = process.env.EMAIL_HOSTING_USER || "no-reply@webpage.com";
process.env.EMAIL_HOSTING_PASSWORD = process.env.EMAIL_HOSTING_PASSWORD || "1234567";