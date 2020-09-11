# TOMÁS BUSQUETS

## PROCESO DEL TRABAJO

El ejemplo no está 100% completo ni tampoco va a funcionar debido a que falta el front-end y armar el index.js donde se conecta una base de datos, pero la base y lógica sí. Yo creo que es suficiente el trabajo como demostración muy básica.

## DEPENDENCIAS NECESARIAS Y/O RECOMENDADAS

1. Mongoose para usar el MongoDB y utilizar métodos realmente simples.
2. Mongoose-unique-validator (aunque no se usa en este ejemplo) para validar qué contenido se aprueban antes de poner en la DB.
3. Jsonwebtoken para la creación de token JWT y autenticación.
4. Moment para la manipulación de fechas y horas.
5. Express para el REST API de una manera muy sencilla.
6. Nodemailer para el envío de Emails con archivos adjuntos incluidos.
7. Alguno más me habrá faltado que no van al caso en este ejemplo tales como Multi-party para poder guardar imágenes, etc.

## ARQUITECTURA

Mi modelo de trabajo es el siguiente:

- Carpeta API-Challenge
- - controllers
- - - home.js
- - - organizer.js
- - - regular.js
- - middlewares
- - - authenticated.js
- - models
- - - activity.js
- - routers
- - - home.js
- - - organizer.js
- - - regular.js
- - utils
- - - functions.js
- - app.js
- - config.js
- - index.js (no está acá)

Si se observa que los nombres del controllers y routers son iguales (también aplico para modelos, pero en este caso no va). De esa manera puedo asociarlos y no equivocarme (bueno, todos nos equivocamos alguna vez).

En middlewares suelo poner un solo archivo llamado authenticated.js, si hay otros que no tienen relación con iniciar sesión del usuario, agrego otro archivo y lo agrego en los Router correspondientes.

En utils suelo poner files con funciones que no aplican en ninguna de los controllers.

En config suelo poner variables de entorno.

En app.js suelo cargar todos los archivos restantes y lograr la comunicación del M-R-C.

En index.js suelo conectar la base de datos de MongoDB.

En los controllers simplemente hay una sola variable llamado "controller" la cual es un objecto de funciones que se aplican según lo que mande el Router.


## LISTA DE ENDPOINTS CON /API/V1

Todos los endpoints usan POST. Y usan la v1 del API.

- /get-activities
- /all-activities-user
- /all-activities-member
- /update-activity
- /remove-activity
- /send-invitation
- /action-join-activity
- /join-activity
- /action-invitation


# FIN


---------------------------------------------------------------------------

# API Challenge

There is a list of Activities to do in a City, they are grouped into different Categories, such as "Outdoors", "Food & Drinks", "Clubs", etc.
For each Activity there are different Users, one of them is the Activity Organizer, who can send invitations to other Users for joining that Activity and any User can also request to join a specific Activity. In any case the invitations can be accepted or rejected.

## Requirements:

Implement a REST API that allow to perform CRUD opperations over Users and Activities.
Implement authentication using JWT tokens and users authorization.
Any user can request the Activities list and Users list, but only authenticated users can create, authorize and update Activities.

As an Organizer User:
- Be able to update or remove an Activity.
- Be able to submit invitations for an Activity.
- Be able to accept or reject a request to join an Activity.
        
As a Regular User:
- Be able to submit a request for joining an Activity.
- Be able to accept or reject invitations to join an Activity.
     
Objectives:
- Get Activities based on their Category (can perform a search by the Category id).
- List all the Activities organized by a specific User.
- List all the Activities for which a specific User is a Member of.
         
## Extra credit:

1. Deploy the solution to a web server (AWS, Heroku, cloud servers, etc.).
2. Implement tests for the models and the API requests.
         
## Delivery Steps: 

Please clone the repository, complete the exercise, upload the solution to your own repo and share the link with us. If you have any questions, you can reach out directly via email. Remember, all instructions for running the application (including installing relevant libraries, etc.) should be included in the README.md file. 

1. Clone the repo to your local machine.
2. Implement the functionality and update the README.md file with instructions to setup and run the application. Also add the list of endpoints.
3. Create a repo with your personal account and upload the solution to it. **We don't accept Pull Requests to this repository**.
4. Share the link to your personal repository with us so we can review it.

Thank you and good luck!
