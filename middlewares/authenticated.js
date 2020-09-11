const jwt = require("jsonwebtoken"); //usamos el jsonwebtoken

// VERIFICACIÓN TOKEN
let checkToken = (req, res, next) => {
    if (!req.headers.authorization) { //cuando no hay cabecera
        return res
          .status(403) //403
          .json({
            status: false,
            authorized: false,
            token: undefined,  
            message: "403 Forbidden." 
        });
    } else {
        const token = req.headers.authorization.replace(/['"]+/g, "").replace("Bearer ", "");
        jwt.verify(token, process.env.SEED, (err, decoded) => { //VERIFICA SI COINCIDE y usamos la ENV.SEED, ni siquiera tenemos que importar el config.js en este archivo
            if(err) {
                return res.status(200).json({ //401 denegamos el acceso
                    status: false,
                    authorized: false,
                    token: undefined, // enviamos undefined para que en el frontend sepa que algo falló y entonces elimina el token del localstorage o asyncstorage
                    message: 'Token no válido'
                });
            }
            // es el payload, req.user LO GUARDA PARA QUE SE PUEDA USAR después
            req.user = decoded; //user viene de Login de jwt.sign({}) que acá no está, pero dejo abajo como comentario un ejemplo de la creación de un token (se almacena en un json con el objeto user)
            req.token = token; // guardamos la token (en este caso, no servirá de nada, pero muestro un ejemplo)
            next(); // PASAMOS AL SIGUIENTE NIVEL, eso con los valores nuevos como user y token que almacenamos en el "req"
        });
    }
};

let checkRol = (req, res, next) => {
    if (!req.headers.authorization) { //cuando no hay cabecera, lo mismo
        return res
          .status(403) //403
          .json({
            status: false,
            authorized: false,
            token: undefined,  
            message: "403 Forbidden." 
        });
    } else {
        const token = req.headers.authorization.replace(/['"]+/g, "").replace("Bearer ", "");
        jwt.verify(token, process.env.SEED, (err, decoded) => { //VERIFICA SI COINCIDE y usamos la ENV.SEED, ni siquiera tenemos que importar el config.js en este archivo
            if(err) {
                return res.status(200).json({ //401 denegamos el acceso
                    status: false,
                    authorized: false,
                    token: undefined,
                    message: 'Token no válido'
                });
            }
            req.user = decoded;
            if(req.user.role !== "admin") { // PREGUNTAMOS LOS PRIVILEGIOS DEL USUARIO
                return res.status(200).json({
                    status: false,
                    authorized: false,
                    message: 'Los privilegios no son correctos. '
                });
            } else {
                next(); // si es admin, ok vaya y pase
            }
        });
    }
};


module.exports = { // exportamos las funciones
    checkToken,
    checkRol,
}


// UN EJEMPLO DE CREACIÓN DE UN TOKEN, CUANDO EL USUARIO INICIA SESIÓN

// let token = jwt.sign({ // CREAMOS UN OBJECTO CON LOS VALORES ALMACENADOS QUE CONSIDERAMOS IMPORTANTES
//     id: usuarioDB._id, // el ID único del usuario.
//     user: usuarioDB.user, // nombre del user
//     role: usuarioDB.role, // IMPORTANTE ESO!! acá sabremos los privilegios del usuario
//     loginDate: moment().format("DD/MM/YYYY HH:mm:ss") // USAMOS EL MOMENT PARA ALMACENAR LA HORA QUE SE LOGUEÓ. (QUE ACÁ NO LO INSTALO)
// }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
// return res.json({ // SE ENVÍA AL FRONTEND EN FORMATO JSON
//     status: true, // el status lo considero importante, si es true quiere decir que todo salió perfecto como se esperaba
//     authorized: true, // no es lo mismo que el status, acá quiere decir que el user tenía permisos para tal acción 
//     message: "Se inició la sesión. Será redirigido en 2 segundos. ", // un mensaje que se mostrará en el frontend (en el frontend uso la dep. AXIOS).
//     token // ACÁ ENVIAMOS EL TOKEN TOTALMENTE CODIFICADO PARA QUE EN EL CLIENTE LO ALMACENE EN EL LOCALSTORAGE O ASYNCSTORAGE (SI ES EN EL MÓVIL)
// });
