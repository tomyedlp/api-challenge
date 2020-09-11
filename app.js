//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
// WEBSITE: www.tomasbusquets.com
/*****************************************************/

// Load configs
require("./config"); // LAS VARIABLES DE ENVIROMENT PRECARGADAS (SE MODIFICAN SEGÚN EL CASO, SI ESTÁ EN LOCALHOST, DEVELOPMENT O PRODUCCIÓN)

const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

// ALL ROUTES
const organizerRouters = require("./routers/organizer");
const regularRouters = require("./routers/regular");
const homeRouters = require("./routers/home");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // AUTOMATICAMENTE PARSEA A JSON TODO ELEMENTO QUE SE ENVÍE/RECIBE

app.listen(process.env.PORT, () => {
    console.log("Server listening at port "+process.env.PORT); //usamos el puerto correspondiente según el entorno
});

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // LAS CORS
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "POST"); // ESTE CASO VEMOS QUE SOLO DEJA USAR EL MÉTODO POST, DE LO CONTRARIO AÑADIR PUT, GET, ETC..
    res.header("Allow", "POST"); // ONLY POST ENABLED
    next();
});

// DEPENDIENDO DEL HOSTING (en este caso no sé si se aplica, pero nunca está de más)
let pathPublic = "../public"; // EN LOCALHOST (DICE PUBLIC PORQUE REDIRIGE AL FOLDER PUBLIC DE REACT, DONDE ESTÁ LA WEBAPP COMPILADA)
if(process.env.NODE_ENV === "host") { //EN DEVELOPMENT
  pathPublic = "../public_html";
} else if(process.env.NODE_ENV === "prod") { //EN PRODUCCIÓN
  pathPublic = "../public_html";
}

app.use(express.static(path.join(__dirname, pathPublic)));

// PARA EVITAR 404 NOT FOUND CUANDO QUIERO ACCEDER A UN PATH EN PRODUCCIÓN, POR EJEMPLO WWW.WEBPAGE.COM/CONTACT DIRECTAMENTE, YA QUE REACT ES SINGLE PAGE APP.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, pathPublic, "index.html"));
});

// CONNECT ROUTES WITH API URL AND VERSIONS
app.use(process.env.API_URL, organizerRouters);
app.use(process.env.API_URL, regularRouters);
app.use(process.env.API_URL, homeRouters);

module.exports = {
    app
};