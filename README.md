Problema
Se tiene una lista de actividades para hacer en un determinada ciudad.
Las actividades se clasifican en diversas categorias como: ‘Al aire libre’, ‘Comer y beber’, ‘Discotecas’, etc.
En cada actividad participan diferentes personas.Existe un usuario organizer por actividad. puede enviar una solicitud a otros usuarios para que se unen a la actividad y estos, a su vez pueden enviar una solicitud para participar en la misma. El usuario organizer se considera un member de la actividad
En ambos casos la solicitud puede ser aceptada o rechazada.

Requerimientos
Realizar una API Rest que permita operaciones CRUD sobre usuarios y actividades.
Autenticación y autorización de usuarios. Se debe utilizar JWT tokens .Todos los usuarios pueden consultar el listado de actividades y users pero solo los usuarios logueados pueden crear, actualizar y/o modificar actividades.
Como usuario organizador:
         -Quiero poder editar y/o eliminar una actividad.
         -Quiero poder enviar invitaciones a una actividad.
        -Quiero poder aceptar/rechazar solicitudes para unirse a una actividad.
Como usuario no organizador:
      -Quiero poder enviar una solicitud para unirme a una actividad.
     -Quiero poder aceptar/rechazar invitaciones para unirme a una actividad.
Se require obtener información sobre:
       -Buscar actividades por categorías( se puede realizar la busqueda por id de categoria).
      -Listar las actividades organizadas por un usuario en particular.
      -Listar la lista de actividades para las cuales un usuario es member.
      
Deliverables
PR al repositorio <repository name>
La lista de endpoints. Puede agregarse en el readme del PR.
  
Extra credit
Codigo deployado (AWS, Heroku, cloud servers, etc)
Crear tests para los modelos y las requests.
