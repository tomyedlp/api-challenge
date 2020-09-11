const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const uniqueValidator = require('mongoose-unique-validator'); //--> esto es para validar qué datos tienen permitidos. No lo usamos por ahora.
// let categoriesValues = {
//     values: [0, 1, 2, 3, 4],
//     message: '{VALUES} no es un tipo de DNI válido'
//   }

// creamos el modelo de Activity
const ActivitySchema = Schema({
  name: { type: String, default: "", trim: true },
  organizedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // --> tiene que estar referido con el ID del usuario que creó la actividad (User es la otra colección).
  members: { type: Array, default: [] },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true } // --> Lo mismo
});


module.exports = mongoose.model("Activities", ActivitySchema);