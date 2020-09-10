//////////////////////////////////////////////////////
/////////////////// API-CHALLENGE ////////////////////
//////////////////////////////////////////////////////´

/*****************************************************/
// DEVELOPED BY TOMÁS BUSQUETS //
// CONTACT: busquets64@gmail.com
// WEBSITE: www.tomasbusquets.com
/*****************************************************/

// Load configs
require("./config");

const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

// ALL ROUTES
const contact_routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log("Server listening at port "+process.env.PORT);
});

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "POST"); // ONLY POST ENABLED
    res.header("Allow", "POST"); // ONLY POST ENABLED
    next();
});

// DEPENDIENDO DEL HOSTING
let pathPublic = "../public";
if(process.env.NODE_ENV === "host") {
  pathPublic = "../public_html";
} else if(process.env.NODE_ENV === "prod") {
  pathPublic = "../public_html";
}

app.use(express.static(path.join(__dirname, pathPublic)));

// PARA EVITAR 404 NOT FOUND
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, pathPublic, "index.html"));
});

// CONNECT ROUTES WITH API
app.use(process.env.API_URL, contact_routes);

module.exports = {
    app
};